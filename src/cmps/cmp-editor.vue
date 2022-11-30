<template>
    <section class="cmp-editor">

        <div v-if="isContain('font')">Font Picker</div>
        <div v-if="isContain('backgroundColor')">Background Color Picker</div>
        <div v-if="isContain('color')">Color Picker</div>
        <div v-if="isContain('fontWeight')">Font Weight Picker</div>
        <div v-if="isContain('borderRadius')">Border Radius Picker</div>

        <div v-if="isContain('img')">Img Picker</div>
        <div v-if="isContain('href')">Href Picker</div>
        
    </section>
</template>

<script>

    export default {
        props: {
            _id: String,
            editOptions: Array,
            cmpStyle: Object,
        },

        methods: {
            isContain(type) {
                // TODO: Set Worked
                return true //this.editOptions.includes(type)
            },
        },
    }
</script>