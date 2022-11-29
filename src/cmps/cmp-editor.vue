<template>
    <section class="cmp-editor">
        <font-picker v-if="isContain('font')"/>
        
    </section>
</template>

<script>
    import {eventBus} from '../services/event-bus.service'
    import fontPicker from './editor-cmps/font-picker.vue'

    export default {
        methods: {
            isContain(type) {
                return this.types().includes(type)
            },

            types() {
                return ['font', 'backgroundColor', 'fontWeight', 'img', 'href', 'borderRadius']
            } 
        },

        components: {
            fontPicker, 
        }
    }
</script>