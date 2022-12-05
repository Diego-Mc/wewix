<template>
    <div>
        <h1>{{ confirmData.txt }}</h1>
        <div>
            <button @click="(isDisplayLocation = true)">Yes</button>
            <button @click="$emit('cancelWorkTogether')">No</button>
        </div>
        <div v-if="isDisplayLocation">
            <span @click="copyToClipboard(confirmData.sendedProps.location)">
                Work Space: {{ confirmData.sendedProps.location }}
            </span>
            <button @click="$emit('openWorkSpace')">Close</button>
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
            isDisplayLocation: false
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
        }
    },
}
</script>