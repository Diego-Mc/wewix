<!-- TODO: add a function to check if src is yt link or if suer uploaded a video -->
<template>
  <section class="wap-video" :class="'type-' + typeId">
    <div class="video">
      <iframe
        v-if="info.video"
        width="560"
        height="315"
        :src="info?.video?.options?.meta?.src"
        :style="info?.video?.options.style"
        @click.stop="emitSelect('video')"
        @input="updateContent('video', $event)"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </div>
  </section>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'

export default {
  props: ['info', 'cmpId', 'options', 'childCmpId', 'typeId'],
  methods: {
    updateContent(elType, e) {
      eventBus.emit('cmpUpdated', {
        cmpId: this.cmpId,
        elType,
        content: e.target.innerText,
        childCmpId: this.childCmpId,
      })
    },
    emitSelect(elType, e) {
      eventBus.emit('select', {
        cmpId: this.cmpId,
        childCmpId: this.childCmpId,
        elType,
        elDom: e,
      })
    },
  },
}
</script>
