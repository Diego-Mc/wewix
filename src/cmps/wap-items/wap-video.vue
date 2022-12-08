<!-- TODO: add a function to check if src is yt link or if suer uploaded a video -->
<template>
  <section class="wap-video" :class="'type-' + typeId">
        
    <div class="video"    @click.stop="emitSelect('video')">
      <iframe
        v-if="info.video"
        width="560"
        height="315"
        :src="info?.video?.options?.meta?.src"
        :style="{...info?.video?.options.style,pointerEvents: $store.getters.isEditMode ? 'none' : 'auto'}"
        @input="updateContent('video', $event)"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      
        allowfullscreen></iframe>
    </div>
    <h3
      v-if="info.title"
      class="title"
      :style="info?.title?.options.style"
      @click.stop="emitSelect('title')"
      @input="updateContent('title', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.title?.content.text }}
    </h3>
    <h3
      v-if="info.subtitle"
      class="subtitle"
      :style="info?.subtitle?.options.style"
      @click.stop="emitSelect('subtitle')"
      @input="updateContent('subtitle', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.subtitle?.content.text }}
    </h3>

    <p
      v-if="info.text"
      class="text"
      :style="info?.text?.options.style"
      @click.stop="emitSelect('text')"
      @input="updateContent('text', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.text?.content.text }}
    </p>
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
      console.log('type' ,elType);
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
