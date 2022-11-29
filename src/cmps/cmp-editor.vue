<template>
    <section class="cmp-editor">
        <font-picker v-if="true"/>
        
    </section>
</template>

<script>
    import {eventBus} from '../services/event-bus.service'
    import fontPicker from './editor-cmps/font-picker.vue'

    export default {
        computed() {
            return ['font', 'backgroundColor', 'fontWeight', 'img', 'href', 'borderRadius']
        },
        methods: {
            isContain()
        },
        components: {
            fontPicker, 
        }
    }
</script>