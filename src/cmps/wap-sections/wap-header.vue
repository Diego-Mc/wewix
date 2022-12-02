<template>
  <header
    class="wap-header"
    :class="'type-' + typeId"
    :style="options.style"
    @click.stop="onElClick({ cmpId })">
    <section class="logo">
      <img
        class="img"
        @click.stop="$emit('select', { cmpId, elType: 'img' })"
        :src="info?.img?.options.meta.src" />
      <h1
        class="title"
<<<<<<< HEAD
        @blur="updateContent('title', $event)"
        :style="info.title.options.style"
        @click.stop="onElClick({ cmpId, elType: 'title' })"
=======
        @input="updateContent('title', $event)"
        :style="info?.title?.options.style"
        @click.stop="onElClick('title')"
>>>>>>> 04e97ce5f61f4d17441bf738e9392a8be98695ab
        :contenteditable="$store.getters.isEditMode">
        {{ info?.title?.content.text }}
      </h1>
    </section>
    <nav
      :style="info?.nav?.options.style"
      @click.stop="onElClick({ cmpId, elType: 'nav' })">
      <ul>
        <li v-for="nav in info?.nav?.content">
          {{ nav }}
        </li>
      </ul>
    </nav>
    <button
      class="btn"
      :style="info?.btn?.options.style"
      @click.stop="onElClick({ cmpId, elType: 'btn' })"
      @change="updateContent('btn')">
      {{ info?.btn?.content.text }}
    </button>
  </header>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'
export default {
  props: ['info', 'cmpId', 'options', 'typeId'],
  methods: {
    updateContent(elType, e) {
      eventBus.emit('cmpUpdated', {
        cmpId: this.cmpId,
        elType,
        content: e.target.innerText,
      })
    },
    onElClick(elInfo) {
      eventBus.emit('select', elInfo )
    },
  },
}
</script>

<style lang="scss" scoped></style>

<!-- TODO: This way or using separate files with dynamic component -->
