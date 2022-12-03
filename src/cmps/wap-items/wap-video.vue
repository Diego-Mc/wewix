<template>
    <section class="video-play">
        <iframe width="560" height="315" :src="options.meta.link" title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
            <button @click="log">CLick</button>
    </section>
</template>

<script>
export default {
    name: 'video-play',
    props: {
        options: Object
    },

    methods: {
        log() {
            
        }
    },
}
</script>



