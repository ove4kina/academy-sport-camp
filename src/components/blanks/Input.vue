<template lang="pug">
    include ../../tools/mixins.pug

    +b.input(
        :class="{'focus': status.focus, 'error': error}"
    )
        +e.placeholder {{placeholder}}
        input(
            :name="name"
            :type="type"
            v-bind:value="value"
            v-on:focus="status.focus = true"
            v-on:blur="onBlur"
            @input="change"
        )
        +e.error

</template>

<script>
    export default {
        props:['placeholder','name', 'type', 'error', 'value'],
        data(){
            return{
                status: {
                    focus: false,
                    error: false
                }
            }
        },
        methods: {
            onBlur() {
                if (this.value === '' || typeof this.value === 'undefined' || this.value === null) {
                    this.status.focus = false
                }
            },
            change(event) {
                this.$emit('change', {name: this.name, value: event.target.value})
            }
        },
        created(){
            if(this.value !== '' && typeof this.value !== 'undefined' && this.value !== null) {
                this.status.focus = true;
            }
        },
        watch: {
            'value': function (newValue,oldValue) {

                if(newValue !== '' && typeof newValue !== 'undefined' && newValue !== null) {
                    this.status.focus = true;
                } else {
                    this.status.focus = false;
                }

                if (this.error === true) {
                    if (newValue) {
                        this.$emit('clearError', {status: false, name: this.name})
                    }
                }
            }
        }

    }
</script>
