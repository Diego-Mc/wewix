<template>

    <div>
        <span @click="animateStart = 'hover'">When Hovering</span>
        <span @click="animateStart = 'enter'">When Entering</span>
    </div>

    <section >
        <div class="animate headShake" @click="setAnimation('headShake')">
            Shake
        </div>
        <div class="animate pulse" @click="setAnimation('pulse')">
            Pulse
        </div>
        <div class="animate flash" @click="setAnimation('flash')">
            flash
        </div>
        <div class="animate jello" @click="setAnimation('jello')">
            jello
        </div>
        <div class="animate jello" @click="setAnimation('fadeInDown')">
            fadeInDown
        </div>
    </section>

</template>

<script>
import 'animate.css';

export default {
    props: {
        animation: String
    },
    data() {
        return {
            animateStart: 'hover'
        }
    },
    methods: {
        setAnimation(selectedAnimation) {
            const animationClass = `animate${this.animateStart === 'hover' ? ' ' : '__'}${selectedAnimation}`
            this.$emit('select', { key: 'animation', val: animationClass })
        }
    },

}
</script>