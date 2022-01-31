<template lang="pug">
    include ../../../../tools/mixins.pug

    +b.popup-formation(
        ref="popup"
        :class="{'active': active, 'body': currentStep !== 'response', 'response': currentStep === 'response'}"
    )
        +e.progress(:style="{'transform': `scaleX(${progress / 100})`}")
        +e.body
            +e.container.container
                +e.close(v-on:click="closePopup")
                +e.progress-text {{ stepNumber }}/3 #[span(v-show="currentStep === 'selection'") Персональные предочтения] #[span(v-show="currentStep === 'priceList' || currentStep === 'contacts'") Выберите дисциплины]
                +e.H2.title.title--small #[span сформируйте свое]#[br]индивидуальное#[br]предложение
                +e.includes(
                    v-if="!isMobile"
                    :class="{'show': currentStep === 'priceList', 'hide':  currentStep !== 'priceList'}"
                )
                    +e.collapse.collapse__.--green(
                        :class="{'active': collapse.active === 0}"
                        v-on:click="showCollapse(0)"
                    )
                        +e.title Входит в стоимость
                        +e.content
                            +e.item
                                img(src="/public/media/images/popup/vhod1.svg")
                                span Тренажерные залы
                            +e.item
                                img(src="/public/media/images/popup/vhod2.svg")
                                span Бассейн
                            +e.item
                                img(src="/public/media/images/popup/vhod3.svg")
                                span Велосипеды
                            +e.item
                                img(src="/public/media/images/popup/vhod4.svg")
                                span Студия Йоги
                            +e.item
                                img(src="/public/media/images/popup/vhod5.svg")
                                span Финская сауна
                            +e.item
                                img(src="/public/media/images/popup/vhod6.svg")
                                span Джакузи
                            +e.item
                                img(src="/public/media/images/popup/vhod7.svg")
                                span Футбольные поля
                            +e.item
                                img(src="/public/media/images/popup/vhod1.svg")
                                span Вилла lux-класса
                    +e.collapse.collapse__.--red(
                        :class="{'active': collapse.active === 1}"
                        v-on:click="showCollapse(1)"
                    )
                        +e.title Не входит в стоимость
                        +e.content
                            +e.item
                                img(src="/public/media/images/popup/ne1.svg")
                                span Перелет
                            +e.item
                                img(src="/public/media/images/popup/ne2.svg")
                                span Туристические прогулки
                            +e.item
                                img(src="/public/media/images/popup/ne3.svg")
                                span Трансфер внутри страны
                +e.steps(
                    ref="steps"
                    :style="{'height': `${stepsHeight}px`}"
                )
                    +e.step--selection(:class="{'active': currentStep === 'selection', 'hide': currentStep !== 'selection'}" ref="selection")
                        +e.description Выберите основные параметры поездки, чтобы мы проверили наличие мест и сформировали лучшее предложение для вас.
                        +e.content
                            +e.wrapper
                                +e.text Кол-во людей
                                +e.count
                                    +e.button--minus.hover--gray(v-on:click="changeCount('-')") -
                                    +e.number-label {{ counter.number }}
                                    +e.button--plus.hover--gray(v-on:click="changeCount('+')") +
                            +e.wrapper
                                +e.text В какие даты вы планируете посетить лагерь?
                                +e.dates
                                    +e.date--start
                                        date-pick.popup-date(
                                            v-model="dates.start"
                                            :format="'DD.MM.YYYY'"
                                            :weekdays="weekdays"
                                            :months="months"
                                            :isDateDisabled="disabledStartDates"
                                        )
                                    +e.date--end
                                        date-pick.popup-date(
                                            v-model="dates.end"
                                            :format="'DD.MM.YYYY'"
                                            :weekdays="weekdays"
                                            :months="months"
                                            :isDateDisabled="disabledEndDates"
                                        )
                            +e.wrapper
                                +e.text Выберите план питания
                                +e.selection()
                                    +e#food-individual.tab.hover--gray(
                                        :class="{'active': tabs.food.tabIndex === 0}"
                                        v-on:click="setTabIndex(0,'food')"
                                    ) Индивидуальный
                                    +e#food-common.tab.hover--gray(
                                        :class="{'active': tabs.food.tabIndex === 1}"
                                        v-on:click="setTabIndex(1,'food')"
                                    ) Общий
                                    +e#food-none.tab.hover--gray(
                                        :class="{'active': tabs.food.tabIndex === 2}"
                                        v-on:click="setTabIndex(2,'food')"
                                    ) Без питания
                            +e.wrapper--padding-top
                                +e.info
                                    +e.info-text #[b Индивидуальный] — питание разрабатывается строго под ваши вкусовые предпочтения профессиональным диетологом #[br]#[b Общий] — стандартное питание, которое предусмотрено для посетителей Academy Sport Camp#[br]#[b Без питания] — отказ от питания, предоставленного лагереам Academy Sport Camp
                    +e.step--price-list(:class="{'active': currentStep === 'priceList', 'hide': currentStep !== 'priceList'}" ref="priceList")
                        +e.description--margin-none Выберите одну из программ персонального отдыха в Academy Sport Camp с профессиональными тренерами и диетологами
                        +e.content
                            +e.includes(v-if="isMobile")
                                +e.collapse.collapse__.--green(
                                    :class="{'active': collapse.active === 0}"
                                    v-on:click="showCollapse(0)"
                                )
                                    +e.title Входит в стоимость
                                    +e.content
                                        +e.item
                                            img(src="/public/media/images/popup/vhod1.svg")
                                            span Тренажерные залы
                                        +e.item
                                            img(src="/public/media/images/popup/vhod2.svg")
                                            span Бассейн
                                        +e.item
                                            img(src="/public/media/images/popup/vhod3.svg")
                                            span Велосипеды
                                        +e.item
                                            img(src="/public/media/images/popup/vhod4.svg")
                                            span Студия Йоги
                                        +e.item
                                            img(src="/public/media/images/popup/vhod5.svg")
                                            span Финская сауна
                                        +e.item
                                            img(src="/public/media/images/popup/vhod6.svg")
                                            span Джакузи
                                        +e.item
                                            img(src="/public/media/images/popup/vhod7.svg")
                                            span Футбольные поля
                                        +e.item
                                            img(src="/public/media/images/popup/vhod1.svg")
                                            span Вилла lux-класса
                                +e.collapse.collapse__.--red(
                                    :class="{'active': collapse.active === 1}"
                                    v-on:click="showCollapse(1)"
                                )
                                    +e.title Не входит в стоимость
                                    +e.content
                                        +e.item
                                            img(src="/public/media/images/popup/ne1.svg")
                                            span Перелет
                                        +e.item
                                            img(src="/public/media/images/popup/ne2.svg")
                                            span Туристические прогулки
                                        +e.item
                                            img(src="/public/media/images/popup/ne3.svg")
                                            span Трансфер внутри страны
                            +e.programms.popup-programm__
                                +e.item.program-card(
                                    :class="{'active': programm.active === 0}"
                                    v-on:click="setActiveProgram(0)"
                                )
                                    +e.right
                                        span в день
                                        +e.price от 100 $
                                    span Программа
                                    p Детокс
                                    +e.text Естественное очищение организма от шлаков и токсинов
                                +e.item.program-card(
                                    :class="{'active': programm.active === 1}"
                                    v-on:click="setActiveProgram(1)"
                                )
                                    +e.right
                                        span в день
                                        +e.price от 100 $
                                    span Программа
                                    p Худеем с#[br]удовольствием
                                    +e.text Йога, массажи и натуральное питание под надзором персонального тренера
                                +e.item.program-card(
                                    :class="{'active': programm.active === 2}"
                                    v-on:click="setActiveProgram(2)"
                                )
                                    +e.right
                                        span в день
                                        +e.price от 90 $
                                    span Программа
                                    p Muay Thai
                                    +e.text Постигайте боевое искусство Таиланда с известными спортсменами и тренерами
                    +e.step--contacts(:class="{'active': currentStep === 'contacts', 'hide': currentStep !== 'contacts'}" ref="contacts")
                        +e.description--margin-none.--color-white {{ result }}
                        //+e.description--margin-medium.--color-white Цена начинается от #[span.yellow 1000$] на человека. Чтобы уточнить стоимость, а также возможные #[span.red акции и скидки] — оставьте свои контактны данные и мы свяжемся с вами.
                        +e.description--margin-medium.--color-white Чтобы уточнить стоимость, а также возможные #[span.red акции и скидки] — оставьте свои контактны данные и мы свяжемся с вами.
                        +e.content
                            +e.wrapper
                                +e.text Удобный метод связи
                                +e.selection
                                    +e.tab.hover--gray(
                                        :class="{'active': tabs.communication.tabIndex === 0}"
                                        v-on:click="setTabIndex(0,'communication')"
                                    ) Whats’app
                                    +e.tab.hover--gray(
                                        :class="{'active': tabs.communication.tabIndex === 1}"
                                        v-on:click="setTabIndex(1,'communication')"
                                    ) Telegram
                                    +e.tab.hover--gray(
                                        :class="{'active': tabs.communication.tabIndex === 2}"
                                        v-on:click="setTabIndex(2,'communication')"
                                    ) Viber
                                    +e.tab.hover--gray(
                                        :class="{'active': tabs.communication.tabIndex === 3}"
                                        v-on:click="setTabIndex(3,'communication')"
                                    ) WeChat
                                    +e.tab.hover--gray(
                                        :class="{'active': tabs.communication.tabIndex === 4}"
                                        v-on:click="setTabIndex(4,'communication')"
                                    ) Email
                            //+e.wrapper
                            //    +e.text Ваше имя
                            //    +e.input.hover--gray
                            //        input#inputName(
                            //            v-model="input.name"
                            //            @input="onInput"
                            //        )
                            +e.wrapper
                                +e.text {{ contactLabel }}
                                +e.input.hover--gray
                                    input#contactInput(
                                        v-if="contactPhone"
                                        v-model="input.contact"
                                        @input="onInput"
                                    )
                                    input#contactInput(
                                        v-if="!contactPhone"
                                        v-model="input.contact"
                                        @input="onInput"
                                    )

            +e.bottom
                +e.bottom-wrapper
                    +e.result {{ result }}
                    +e.politics(
                        v-if="currentStep === 'contacts'"
                        :class="{'show': currentStep === 'contacts'}"
                    ) Нажимая кнопка «Далее», вы соглашаетесь с #[a(href="https://academysport.camp/privacy") #[span политикой обработки персональных данных]]
                    +e.BUTTON.button--next.button--white(
                        v-on:click="toNextStep"
                        :class="{'active': button.active, 'button-first-steps': currentStep === 'selection' || currentStep === 'priceList', 'button-last-steps' : currentStep === 'contacts' || currentStep === 'response'}"
                    ) Далее
        +e.response
            +e.container.container
                +e.H2.title.title--small Предложение#[br]#[span сформированно]
                +e.description.--margin-none Ваше индивидуальное предложение сформировано. С вами свяжется наш менеджер для уточнения деталей
                +e#popupButtonComplete.button--complete.button--white(v-on:click="closePopup") Закрыть

</template>

<script>
    import scrollLock from 'scroll-lock';
    import DatePick from 'vue-date-pick';
    import axios from 'axios'
    import 'vue-date-pick/dist/vueDatePick.css';

    export default {
        props: ['active'],
        data() {
            return {
                recall: '',
                isMobile: false,
                stepsHeight: null,
                button:{
                    active: false,
                },
                dateString: '',
                stepNumber: 1,
                input:{
                    name: '',
                    contact: ''
                },
                contactLabel: 'Ваш телефон',
                contactPhone: false,
                progress: 0,
                collapse: {
                    active: null,
                },
                programm:{
                    active: null,
                    text: '',
                },
                dates: {
                    start: this.formattingNewDate(new Date),
                    end: '',
                    currentDate: (new Date()).setDate((new Date()).getDate() - 1),
                    minDate: (new Date()).setDate((new Date()).getDate() - 1),
                    maxDate: (new Date).setFullYear(new Date().getFullYear() + 5),
                },
                tabs: {
                    food: {
                        tabIndex: 0
                    },
                    communication: {
                        tabIndex: 0
                    }
                },
                tabInfo: 'Индивидуальное',
                wordPrefix: 'й',
                currentStep: 'selection',
                counter: {
                    number: 1,
                },
                weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            }
        },
        methods: {
            setActiveProgram(activeProgramm){
                this.programm.active = activeProgramm;
                if(activeProgramm === 0){
                    this.programm.text = 'Детокс'
                } else if(activeProgramm === 1){
                    this.programm.text = 'Худеем с удовольствием'
                } else {
                    this.programm.text = 'Muay Thai'
                }
                this.button.active = true;
            },
            onInput(){
                if(this.contactLabel === 'Ваш телефон'){
                    this.input.contact = this.input.contact.replace(/\D+/g, '');
                }
                if(this.input.contact !== ''){
                    this.button.active = true;
                }
            },
            showCollapse(activeCollapse){
                if(window.innerWidth < 1200){
                    if(this.collapse.active === activeCollapse){
                        this.collapse.active = null;
                    } else {
                        this.collapse.active = activeCollapse;
                    }
                    setTimeout(() => {
                        this.setStepsHeight();
                    },100)
                }
            },
            toNextStep(){
                this.button.active = false;
                if(this.currentStep === 'selection') {
                    this.currentStep = 'priceList';
                    this.progress = 60;
                    this.stepNumber = 2;
                } else if(this.currentStep === 'priceList') {
                    this.currentStep = 'contacts';
                    this.progress = 90;
                    this.stepNumber = 3;
                }  else if(this.currentStep === 'contacts') {
                    this.send();
                    this.currentStep = 'response';
                    this.progress = 100;
                }
                this.setStepsHeight();
            },
            setTabIndex(tab, name) {
                this.tabs[name].tabIndex = tab;
                if (name === 'food') {
                    switch (this.tabs.food.tabIndex) {
                        case 0: {
                            this.tabInfo = 'индивидуальное';
                            break;
                        }
                        case 1: {
                            this.tabInfo = 'общее';
                            break;
                        }
                        case 2: {
                            this.tabInfo = 'отсутствует';
                            break;
                        }
                    }
                }
                if (name === 'communication') {
                    switch (this.tabs.communication.tabIndex) {
                        case 0: {
                            this.recall = 'Whats’app';
                            this.contactLabel = 'Ваш телефон'
                            break;
                        }
                        case 1: {
                            this.recall = 'Telegram';
                            this.contactLabel = 'Ваш телефон'
                            break;
                        }
                        case 2: {
                            this.recall = 'Viber';
                            this.contactLabel = 'Ваш телефон'
                            break;
                        }
                        case 3: {
                            this.recall = 'WeChat';
                            this.contactLabel = 'Ваш телефон'
                            break;
                        }
                        case 4: {
                            this.recall = 'Email';
                            this.contactLabel = 'Ваш E-mail'
                            break;
                        }
                    }
                }
            },
            send() {
                axios({
                    method: 'post',
                    url: '/send-form-full',
                    data: {
                        people: this.counter.number,
                        dates: this.dates,
                        food: this.tabInfo,
                        program: this.programm.text,
                        recall: this.recall,
                        name: this.input.name,
                        phone: this.input.contact
                    }
                })
                    .then(response => {
                        if(response.status === 200){

                        }
                    })
                    .catch(e => {
//                        console.log(e)
                    })
            },
            setStepsHeight(){
                let rect = this.$refs.steps.getBoundingClientRect();
                if(window.innerWidth >= 1200){
                    this.stepsHeight = window.innerHeight - rect.y;
                } else {
                    this.stepsHeight = this.$refs[this.currentStep].getBoundingClientRect().height;
                }
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
                    this.closePopup();
                }
            },
            changeCount(operator){
                if(operator === '+'){
                    this.counter.number += 1;
                } else if(operator === '-'){
                    if(this.counter.number === 1){
                        return;
                    } else {
                        this.counter.number -= 1;
                    }
                }
                let number = this.counter.number.toString();
                if(number === '11'){
                    this.wordPrefix = 'х';
                } else if(number[number.length - 1] === '1'){
                    this.wordPrefix = 'й';
                } else {
                    this.wordPrefix = 'х';
                }
            },
            declOfNum(number, titles) {
                let cases = [2, 0, 1, 1, 1, 2];
                return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
            },
            closePopup(){
                this.dates = {
                    start: this.formattingNewDate(new Date),
                    end: ''
                };
                this.input = {
                    name: '',
                    contact: ''
                };
                this.programm = {
                    active: null,
                    text: '',
                };
                this.tabs = {
                    food: {
                        tabIndex: 0
                    },
                    communication: {
                        tabIndex: 0
                    }
                };
                this.recall = '';
                this.counter.number = 1;
                setTimeout(() => {
                    this.progress = 0;
                    this.stepNumber = 1;
                    this.currentStep = 'selection';
                },300)

                this.$emit('closePopup')
            },
            checkDates(){
                let dateStart = `${this.dates.start.split('.')[1]}/${this.dates.start.split('.')[0]}/${this.dates.start.split('.')[2]}`;
                let dateEnd = `${this.dates.end.split('.')[1]}/${this.dates.end.split('.')[0]}/${this.dates.end.split('.')[2]}`;
                if(dateStart.length === 10 && dateEnd.length === 10){
                    if(new Date(dateStart) > new Date(dateEnd)){
                        this.dateString = (new Date(dateStart) - new Date(dateEnd))/ 1000 / 60 / 60 / 24;
                    } else {
                        this.dateString = (new Date(dateEnd) - new Date(dateStart))/ 1000 / 60 / 60 / 24;
                    }
                }
                return this.dates.start !== '' && this.dates.end !== '';
            },
            checkWindowWidth(){
                if(window.innerWidth < 1200){
                    this.isMobile = true;
                } else {
                    this.isMobile = false;
                }
            },
            formattingNewDate(date){
                return `${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}.${(date.getMonth()+1) > 9 ? date.getMonth() + 1 : '0' + (date.getMonth()+1)}.${date.getFullYear()}`
            },
            disabledStartDates(date) {
                if(date < this.dates.currentDate) {
                    return true
                } else if(date >  this.dates.maxDate) {
                    return true
                }

                return false
            },
            disabledEndDates(date){
                return date < this.dates.minDate;
            }
        },
        computed: {
            result: function(){
                let string = `${this.counter.number} взрослы${this.wordPrefix}`;
                if(this.checkDates()){
                    if(this.dateString !== '' && this.dateString !== 0){
                        string += `, ${this.dateString} д${this.declOfNum(this.dateString,['ень','ня','ней'])} и ${this.dateString - 1} ноч${this.declOfNum(this.dateString-1,['ь','и','ей'])}`
                    } else {
                        string += ', 0 дней и 0 ночей';
                    }
                }
                string += `, Питание ${this.tabInfo}`;
                if(this.programm.active !== null){
                    string += `, Программа «${this.programm.text}»`;
                }
                return string;
            }
        },
        watch: {
            'input.name': function (newValue) {
                if(this.input.name.length === 0){
                    this.button.active = false;
                }
            },
            'input.contact': function (newValue) {
                console.log(this.input.contact)
                if(this.input.contact.length < 6 && this.contactLabel === 'Ваш телефон'){
                    this.button.active = false;
                } else if(this.input.contact.indexOf('@') === -1 && this.contactLabel !== 'Ваш телефон'){
                    this.button.active = false;
                }
            },
            'dates.start': function (newValue) {
                this.dates.minDate = new Date(`${this.dates.start.split('.')[1]}.${this.dates.start.split('.')[0]}.${this.dates.start.split('.')[2]}`);
                //this.button.active = this.checkDates();
            },
            'dates.end': function (newValue) {
                this.dates.maxDate = new Date(`${this.dates.end.split('.')[1]}.${this.dates.end.split('.')[0]}.${this.dates.end.split('.')[2]}`);
                //this.button.active = this.checkDates();
            },
            active: function(newValue){
                if(newValue){
                    this.button.active = true;
                    scrollLock.disablePageScroll(this.$refs.popup);
                    this.progress = 30;
                    window.addEventListener('keydown', this.onKeyDown);
                } else {
                    scrollLock.enablePageScroll(this.$refs.popup);
                    window.removeEventListener('keydown', this.onKeyDown);
                }
            }
        },
        mounted(){
            this.checkWindowWidth();
            this.checkDates();
            this.setStepsHeight();
        },
        destroyed(){
        },
        components: {
            DatePick
        }
    };
</script>