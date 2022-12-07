<template>
    <div class="work-together-modal">
        <h1>{{ confirmData.txt }}</h1>
        <div v-if="!isDisplayUrl">
            <button @click="(isDisplayUrl = true)">Yes</button>
            <button @click="$emit('closelModal')">No</button>
        </div>
        <div v-else>
            <span @click="openWorkSpace">
                Work Space: {{ currentUrl }}
                click to copy and exit
            </span>
            <button @click="$emit('closelModal')">Cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        confirmData: Object
    },

    data() {
        return {
            isDisplayUrl: false
        }
    },

    methods: {
        copyToClipboard(text) {
            var input = document.createElement('input');
            input.setAttribute('value', text);
            document.body.appendChild(input);
            input.select();
            var result = document.execCommand('copy');
            document.body.removeChild(input);
            return result;
        },

        openWorkSpace() {
            this.$router.replace({...this.$route, query: {workTogether: true}})
            this.copyToClipboard(this.currentUrl)
            this.$emit('openWorkSpace')
            this.$emit('closelModal')
        }
    },
    computed: {
        currentUrl() {
            return window.location.href + '?workTogether=true'
        }
    }
}
</script>

<style>
.work-together-modal{
    z-index: 100000;
    background-color: aliceblue;
}
</style>