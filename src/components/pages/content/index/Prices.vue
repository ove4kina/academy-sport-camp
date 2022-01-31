<template lang="pug">
    include ../../../../tools/mixins.pug

    +b.SECTION.prices#prices
        +e.container.container
            +e.H2.title.title Цена на абонементы #[span спортивного лагеря]
            +e.wrapper--main
                +e.content
                    +e.toggle-bar
                        +e.tabs.tabs__
                            +e.BUTTON.item--prices.button(type="button" :class="{'active': activeTab.index === 0}" @click="toggleTabs(0)" ref="tab0")
                                span Абонемент
                            +e.BUTTON.item--prices.button(type="button" :class="{'active': activeTab.index === 1}" @click="toggleTabs(1)" ref="tab1")
                                span Проживание
                            <!--+e.active(-->
                                <!--ref="activeTab"-->
                                <!--:style="{left: activeTab.left + 'px',width: activeTab.width + 'px'}"-->
                            <!--)-->
                        +e.info
                            p Абонемент дает вам право посещать спортивный лагерь «Academy» в течении указанного на нем периода.
                    +e.lists(:style="{height: listsHeight}" ref="lists")
                        +e.table.table__(:class="{'active': activeTab.index === 0}" ref="list0")
                            +e.head
                                +e.wrapper--head
                                    +e.col--1.--head
                                        p Действует
                                    +e.col--2.--head
                                        p Кол-во людей
                                    +e.col--3.--head
                                        p Тип доступа*
                                    +e.col--4.--head
                                        p Стоимость
                            +e.body
                                +e.scroller
                                    +e.line(
                                        v-for="item in content.subscriptions"
                                    )
                                        +e.wrapper--line
                                            +e.col--1.--body
                                                p {{item.days}}
                                            +e.col--2.--body
                                                p {{item.mans}}
                                            +e.col--3.--body
                                                p {{item.type}}
                                            +e.col--4.--body(
                                                :class="{'table__col--sale': item.discount > 0}"
                                            )
                                                p(
                                                    v-if="item.discount === 0"
                                                ) {{item.cost}}
                                                b(
                                                    v-else
                                                ) {{item.cost}} #[strong {{item.oldCost}} бат] #[div #[p -{{item.discount}}%]]
                                            +e.col--5.--body
                                                +e.BUTTON.button.button--skew.--yellow(
                                                    v-on:click="openPopup('Абонемент - ' + item.cost)"
                                                    type="button"
                                                    :class="{'button--sale':item.discount > 0}"
                                                )
                                                    span(
                                                        v-if="item.discount === 0"
                                                        v-html="item.cost === 'По запросу' ? 'Запросить цену' : 'Купить <b>за ' + item.cost +'</b>'"
                                                    ) Купить #[b за {{item.cost}}]

                                                    span(
                                                        v-else
                                                    ) Купить #[i за #[b {{item.cost}} #[strong {{item.oldCost}} бат] #[div #[p -{{item.discount}}%]]]]
                        +e.cards.cards__(:class="{'active': activeTab.index === 1}" ref="list1")
                            +e.item(
                                v-for="(item,index) in content.cards"
                            )
                                +e.line--top(
                                    v-on:click="toggleCard(index)"
                                )
                                    +e.skew--top
                                        +e.unskew--top
                                            +e.title(
                                                :class="{'active': cards.activeIndex === index}"
                                            )
                                                span {{item.name}}
                                            +e.info--top
                                                p Стоимость, мес
                                                span {{item.standardCost}} бат
                                            +e.info--top
                                                p Скидка при годовом контракте
                                                span {{item.yearCost}} бат
                                            +e.BUTTON.button--top.button--skew.--yellow(
                                                v-on:click.stop="openPopup('Проживание - ' + item.name)"
                                                type="button"
                                            )
                                                span Заказать
                                +e.body(
                                    :style="{ height: cards.activeIndex === index ? cardHeight : 0}"
                                    :class="{'active': cards.activeIndex === index}"

                                    ref="cardBody"
                                )
                                    template(v-if="index === 0")
                                        +e.photos.swiper-container(
                                            v-swiper:mySwiperOne="swiper"
                                        )
                                            .swiper-wrapper
                                                +e.photo.swiper-slide(
                                                    v-for="photo in item.photos"
                                                )
                                                    img.swiper-lazy(
                                                        :data-src="photo"
                                                    )
                                            .swiper-pagination
                                    template(v-if="index === 1")
                                        +e.photos.swiper-container(
                                            v-if="index === 1"
                                            v-swiper:mySwiperTwo="swiper"
                                        )
                                            .swiper-wrapper
                                                +e.photo.swiper-slide(
                                                    v-for="photo in item.photos"
                                                )
                                                    img.swiper-lazy(
                                                        :data-src="photo"
                                                    )
                                            .swiper-pagination
                                    template(v-if="index === 2")
                                        +e.photos.swiper-container(
                                            v-swiper:mySwiperThree="swiper"
                                        )
                                            .swiper-wrapper
                                                +e.photo.swiper-slide(
                                                    v-for="photo in item.photos"
                                                )
                                                    img.swiper-lazy(
                                                        :data-src="photo"
                                                    )
                                            .swiper-pagination
                                    +e.description
                                        +e.text(v-html="item.text")
                                        +e.benefits
                                            +e.benefit(
                                                v-for="benefit in item.benefits"
                                            ) {{benefit}}
                                +e.line--bottom
                                    +e.skew--bottom
                                        +e.unskew--bottom
                                            +e.info--bottom.--col-1
                                                p Срок действия
                                                span {{item.period}}
                                            +e.info--bottom.--col-2
                                                p Спален
                                                span {{item.badRooms}}
                                            +e.info--bottom.--col-3
                                                p Размещение, чел.
                                                span до {{item.mans}} человек
                                            +e.info--bottom.--col-4
                                                p Тип доступа
                                                span {{item.type}}
                                            +e.logo
                                                p Проживание от
                                                img(
                                                    :src="item.companyLogo"
                                                )
                                            +e.BUTTON.button--bottom.button--skew.--yellow(
                                                v-on:click="openPopup('Проживание - ' + item.name)"
                                                type="button"
                                            )
                                                span Заказать от {{item.yearCost}} бат
                +e.notice.notice__
                    +e.item
                        span Базовый*
                        p Питание и работа с тренером не включены
                    +e.item
                        span Полный*
                        p Питание и работа с тренером при размещении в TMV

 </template>

<script>
    import {scrollTo} from '../../../../mixins/frontEnd/scrollTo'

    export default {
        mixins: [scrollTo],
        data() {
            return {
                listsHeight: null,
                listsHeightBuffer: null,
                activeTab: {
                    index: 0,
                },
                cards:{
                    activeIndex: null
                },
                content: {
                    subscriptions:[
                        {
                            days: '1 день',
                            mans: '1 чел.',
                            type: 'Базовый',
                            cost: '900 бат',
                            oldCost: 0,
                            discount: 0
                        },
                        {
                            days: '1 месяц',
                            mans: '1 чел.',
                            type: 'Базовый',
                            cost: '15000 бат',
                            oldCost: 0,
                            discount: 0
                        },
                        {
                            days: '3 месяца',
                            mans: '1 чел.',
                            type: 'Базовый',
                            cost: '40000 бат',
                            oldCost: 0,
                            discount: 0
                        },
                        {
                            days: 'Групповой абонемент',
                            mans: 'до 100',
                            type: 'Базовый',
                            cost: 'По запросу',
                            oldCost: 0,
                            discount: 0
                        },
                    ],
                    cards: [
                        {
                            name: 'Вилла Type A',
                            photos: ['public/media/images/prices/typeA/1.jpg','public/media/images/prices/typeA/2.jpg','public/media/images/prices/typeA/3.jpg','public/media/images/prices/typeA/4.jpg','public/media/images/prices/typeA/5.jpg'],
                            text: 'Одноэтажная уютная вилла подойдет для размещения небольшой семьи или группы туристов. Площадь дома составляет 190 м<sup>2</sup>, а земельный участок от 200 до 250 м<sup>2</sup>. Внутренний сад представляет собой тропический оазис, окружённый стройными пальмами и экзотической растительностью. ',
                            period: 'Договорной',
                            badRooms: 2,
                            mans: 4,
                            type: 'Полный*',
                            companyLogo: 'public/media/images/mountain-village.svg',
                            standardCost: 70000,
                            yearCost: 65000,
                            benefits: ['1 этаж', 'Wi-Fi','Собственный бассейн']
                        },
                        {
                            name: 'Вилла Type B',
                            photos: ['public/media/images/prices/typeB/1.jpg','public/media/images/prices/typeB/2.jpg','public/media/images/prices/typeB/3.jpg','public/media/images/prices/typeB/4.jpg','public/media/images/prices/typeB/5.jpg'],
                            text: 'Крупная вилла на 4 комнаты и 3 спальни с уникальным садом и интерьером. Для комфортного отдыха представлены все удобства: сплит-системы, 3 ванные комнаты, зона барбекю, открытая терраса и многое другое. Academy Sport Camp всего в минуте ходьбы от виллы — совмещайте отдых и тренировки с комфортом.',
                            period: 'Договорной',
                            col: 4,
                            type: 'Полный*',
                            companyLogo: 'public/media/images/mountain-village.svg',
                            badRooms: 3,
                            standardCost: 85000,
                            yearCost: 80000,
                            mans: 6,
                            benefits: ['1 этаж', 'Wi-Fi','Собственный бассейн']
                        },
                        {
                            name: 'Вилла Type C',
                            photos: ['public/media/images/prices/typeC/1.jpg','public/media/images/prices/typeC/2.jpg','public/media/images/prices/typeC/3.jpg','public/media/images/prices/typeC/4.jpg','public/media/images/prices/typeC/5.jpg'],
                            text: 'Роскошная вилла на 10 персон станет для вас райским местом отдыха и наслаждения. Интерьер виллы уникален и придает особое чувство роскоши. Все инженерные коммуникации и система освещения создавались на основе профессиональных проектов с использованием премиальных материалов и комплектующих. Обратите внимание на открытый бассейн — отдыхайте после тренировок вместе с друзьями.',
                            period: 'Договорной',
                            col: 4,
                            type: 'Полный*',
                            companyLogo: 'public/media/images/mountain-village.svg',
                            badRooms:5,
                            standardCost: 150000,
                            yearCost: 120000,
                            mans: 10,
                            benefits: ['1 этаж', 'Wi-Fi','Собственный бассейн']
                        }
                    ]
                },
                cardHeight: 0,
                swiper: {
                    loop: true,
                    lazy: {
                        loadPrevNext: true
                    },
                    speed: 500,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                },

            };
        },
        methods: {
            openPopup(target) {
                this.$emit('openPopup',target)
            },
            toggleTabs(index) {

                let delayTabs = 0,
                    delayCard  = 0;

                if(this.cards.activeIndex !== null){
                    delayCard = 500;
                    this.cards.activeIndex = null;
                }



                setTimeout(()=>{
                    this.activeTab.index = index;


                    if(index === 0){
                        delayTabs = 500
                    }
                    setTimeout(()=>{
                        this.listsHeight = `${this.$refs[`list${index}`].scrollHeight}px`;
                        this.listsHeightBuffer = this.listsHeight;
                    },delayTabs)
                },delayCard)


            },
            toggleCard(index) {
                if(this.cards.activeIndex !== index){
                    this.cards.activeIndex = index;

                    this.listsHeight = `${this.$refs.cardBody[index].scrollHeight + parseInt(this.listsHeightBuffer,10)}px`;

                    this.cardHeight = `${this.$refs.cardBody[index].scrollHeight}px`
                } else {
                    this.cards.activeIndex = null;
                    this.listsHeight = this.listsHeightBuffer;
                    this.listsHeightBuffer = this.listsHeight;
                }

            },
            getStyle(el, styleProp) {
                let value, defaultView = (el.ownerDocument || document).defaultView;
                // W3C standard way:
                if (defaultView && defaultView.getComputedStyle) {
                    // sanitize property name to css notation
                    // (hypen separated words eg. font-Size)
                    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
                    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
                } else if (el.currentStyle) { // IE
                    // sanitize property name to camelCase
                    styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
                        return letter.toUpperCase();
                    });
                    value = el.currentStyle[styleProp];
                    // convert other units to pixels on IE
                    if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
                        return (function(value) {
                            var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
                            el.runtimeStyle.left = el.currentStyle.left;
                            el.style.left = value || 0;
                            value = el.style.pixelLeft + "px";
                            el.style.left = oldLeft;
                            el.runtimeStyle.left = oldRsLeft;
                            return value;
                        })(value);
                    }
                    return value;
                }
            },
            setStartHeights(){
                this.listsHeight = `${this.$refs.list0.scrollHeight}px`
            }
        },
        mounted() {
            setTimeout(()=>{
                this.setStartHeights()
            })
        }
    };
</script>