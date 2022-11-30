<template>
    <section class="cmp-editor">
        <section class="style-editor">

            <div v-if="isOptionsContain('fontFamily')">
                Font Picker
                <!-- Implement v-model=style.fontFamily -->
            </div>

            <div v-if="isOptionsContain('backgroundColor')">
                Background Color Picker
                <!-- Implement v-model=style.fontFamily -->
            </div>

            <div v-if="isOptionsContain('color')">
                Color Picker
                <!-- Implement v-model=style.color -->
            </div>

            <div v-if="isOptionsContain('fontWeight')">
                Font Weight Picker
                <!-- Implement v-model=style.fontWeight -->
            </div>

            <div v-if="isOptionsContain('borderRadius')">
                Border Radius Picker
                <!-- Implement v-model=style.fontWeight -->
            </div>

        </section>

        <section class="content-editor">

            <div v-if="isOptionsContain('img')">
                Img Picker
                <!-- Implement v-model=style.img -->
            </div>

            <div v-if="isOptionsContain('link')">
                Link
                <!-- Implement v-model=style.link -->
            </div>

            <div v-if="isOptionsContain('link')">Link Picker</div>
        </section>
        
    </section>
</template>

<script>

    export default {
        props: {
            _id: String,
            cmpOptions: Object,
        },

        data() {
            return {      
                options: this.cmpOptions,
            }
        },
        methods: {
            isOptionsContain(type) {
                const options = [...Object.keys(this.cmpOptions)]
                return options.includes(type)
            },
        },
    }
</script>