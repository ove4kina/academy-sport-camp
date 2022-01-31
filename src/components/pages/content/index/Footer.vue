<template lang="pug">
    include ../../../../tools/mixins.pug

    +b#footer.FOOTER.footer(
        :class="{'show-map': mapToggle}"

    )
        +e.container.container
            +e.socials--top
                +e.A(href="https://www.instagram.com/academysport.camp/").social--inst
                +e.A(href="https://www.facebook.com/AcademySport.camp/").social--fb
                +e.A(href="https://vk.com/academysport.camp").social--vk
            +e.content
                +e#contactsItem.H2.title.title Расположение #[br] #[span и  контакты]
                //+e.manager
                //    +e.photo
                //        +e.img
                //            +e.skew-wrapper
                //                img(src="public/media/images/photo.jpg")
                //    +e.name
                //        span Менеджер по маркетингу и продажам
                //        p Светлана Кучина
            +e.contacts(
                ref="footer"
            )
                +e.contact
                    span Звоните / Пишите на почту
                    a.phone-rus(
                        href="tel:+66950282582"
                    )
                        span +66 950 282 582
                    i.whatsapp
                        a.link--whatsapp(href="https://wa.me/66950282582")
                    i.viber
                        a.link--viber(href="viber://chat?number=66950282582")
                    a.phone-thai(
                        href="tel:+79620523582"
                    )
                        span +7 962 052 35 82
                +e.contact
                    span Звоните или пишите
                    a.email(
                        href="mailto: info@academysport.camp"
                    )
                        span info@academysport.camp
                    p Обращайтесь по любым интересующим вопросам, круглосуточно
                    +e.socials--bottom
                        +e.A(href="https://www.instagram.com/academysport.camp/").social--inst
                        +e.A(href="https://www.facebook.com/AcademySport.camp/").social--fb
                        +e.A(href="https://vk.com/academysport.camp").social--vk
                +e.contact-wrapper
                    +e.contact--address-static
                        span Адрес лагеря
                        p 16 moo 6 soi Rai Aoi Najomtien Sattahip, Thailand
                    +e.BUTTON.button--open-map.button--skew.--transparent.--black(
                        v-on:click="mapToggle = true"
                    )
                        span Посмотреть карту
        +e.location
            +e.wrapper
                +e.contact--address-absoluted
                    span Адрес лагеря
                    p 16 moo 6 soi Rai Aoi Najomtien Sattahip, Thailand
                +e.BUTTON.button--toggle-map.button--skew.--transparent.--black(
                    type="button"
                    v-on:click="mapToggle = !mapToggle"
                )
                    span {{ mapToggle || !isMobile ? 'Скрыть карту' :  'Посмотреть карту' }}
                +e.map
                    googlemaps-map(
                        :center.sync="map.center"
                        :zoom.sync="map.zoom"
                        :options="map.options"
                        ref="map"
                    )
                        googlemaps-marker#marker(
                            v-for="(item,index) in map.markers.items"
                            :title="item.title"
                            :key ="index"
                            :position="item.position"
                            :icon="map.icon"
                            :clickable="true"
                            @click="selectMarker($event,index)"
                            :ref="'marker' + index"
                        )
        +e.bottom
            +e.container.container
                p © Academy Sport Camp - все права защищены, 2019
                a(href="/privacy")
                    span Политика конфиденциальности

</template>

<script>
    import {isElementInViewport} from "../../../../mixins/frontEnd/isElementInViewport";
    export default {
        mixins: [isElementInViewport],
        data() {
            return {
                map: {
                    center: {lat: 12.8008, lng: 100.902658},
                    point: {lat: 12.784719, lng: 100.941658},
                    zoom: 14,
                    options: {
                        zoomControl: false,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        rotateControl: false,
                        fullscreenControl: false,
                        styles: [
                            {
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#282828"
                                    }
                                ]
                            },
                            {
                                "elementType": "labels.icon",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#757575"
                                    }
                                ]
                            },
                            {
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                    {
                                        "color": "#212121"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#757575"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.country",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#9e9e9e"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.land_parcel",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.locality",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#bdbdbd"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#757575"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#181818"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#616161"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi.park",
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                    {
                                        "color": "#1b1b1b"
                                    }
                                ]
                            },
                            {
                                "featureType": "road",
                                "elementType": "geometry.fill",
                                "stylers": [
                                    {
                                        "color": "#131313"
                                    }
                                ]
                            },
                            {
                                "featureType": "road",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#8a8a8a"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#131313"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#3c3c3c"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway.controlled_access",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#4e4e4e"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.local",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#616161"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#757575"
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "color": "#131313"
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                    {
                                        "color": "#3d3d3d"
                                    }
                                ]
                            }
                        ]
                    },
                    icon: {
                        url: '/public/media/images/footer/point.svg'
                    },
                    markers: {
                        clicked: false,
                        event: false,
                        opened: {
                            el: null,
                            index: null
                        },
                        items: [
                            {
                                title: 'MV2',
                                position: {lat: 12.784719, lng: 100.941658},
                            },
                        ]
                    }
                },
                mapToggle: false,
                isMobile: false
            }
        },
        mounted(){
            if(window.innerWidth < 650){
                this.isMobile = true;
            }

            if(window.innerWidth < 1200){
                this.map.center = {lat: 12.784719, lng: 100.941658};
            } else {
                document.addEventListener('scroll', this.animationOnScroll)
                this.animationOnScroll();
            }

        },
        destroyed(){
            if(window.innerWidth >= 1200) {
                document.removeEventListener('scroll', this.animationOnScroll)
            }

        },
        methods: {
            selectMarker(marker,index) {
                let map = this.$refs.map.$_map;
                if (this.map.markers.opened.el !== null && this.map.markers.opened.el !== marker.xa.target) {
                    let oldMarker = this.map.markers.opened.el;
                    oldMarker.setAttribute('src','/public/media/images/footer/point.svg');
                    oldMarker.parentNode.style.opacity = 0;
                    this.map.markers.opened.window.close(map, this.$refs['marker' + this.map.markers.opened.index][0].$_marker)
                }

                if (this.map.markers.opened.el !== marker.xa.target) {
                    marker.xa.target.setAttribute('src','/public/media/images/footer/point2.svg');
                    marker.xa.target.parentNode.style.opacity = 1;

                    let infowindow = new google.maps.InfoWindow({
                        content: '<span>Academy Sport Camp</span><p>16 moo 6 soi Rai Aoi Najomtien Sattahip, Thailand</p>'
                    });
                    infowindow.open(map, this.$refs['marker' + index][0].$_marker);

                    this.map.markers.opened = {el: marker.xa.target, index: index, window: infowindow};
                }
            },
            animationOnScroll(){
                if(this.isElementInViewport(this.$refs.footer) && !this.mapToggle){
                    this.mapToggle = true;
                    setTimeout(() => {
                        document.querySelector('.map-view img').setAttribute('src','/public/media/images/footer/point2.svg');
                        //this.$refs['marker' + 0][0].$_marker.icon.url = 'http://burno.tech/mailing/sport-camp-academy/point2.svg';
                        let infowindow = new google.maps.InfoWindow({
                            content: '<span>Academy Sport Camp</span><p>16 moo 6 soi Rai Aoi Najomtien Sattahip, Thailand</p>'
                        });
                        infowindow.open(this.$refs.map.$_map, this.$refs['marker' + 0][0].$_marker);
                        this.map.markers.opened = {index: 0, window: infowindow};
                    },1000)
                }
            },
        },
        watch: {
            'map.markers.opened.window': function (newValue,oldValue) {
                if (newValue !== null) {
                    google.maps.event.addListener(this.map.markers.opened.window,'closeclick',() => {
                        setTimeout(() => {
                            document.querySelector('.map-view img').setAttribute('src','/public/media/images/footer/point.svg');
                        },100);
                        if(this.map.markers.clicked){
                            let oldMarker = this.map.markers.opened.el;
                            oldMarker.setAttribute('src','/public/media/images/footer/point.svg');
                            oldMarker.parentNode.style.opacity = 0;
                        }
                        this.map.markers.opened.el = null;
                        this.map.markers.opened.index = null;
                        this.map.markers.opened.window = null;
                        this.map.markers.clicked = true;
                    });
                }
            }
        }
    };
</script>