<template>
  <header
    class="wap-header"
    :class="'type-' + typeId"
    :style="options.style"
    @click.stop="emitSelect({ cmpId })">
    <section class="logo">
      <img
        v-if="info.img"
        class="img"
        @click.stop="$emit('select', { cmpId, elType: 'img' })"
        :src="info?.img?.options.meta.src" />
      <h1
        v-if="info.title"
        class="title"
        :style="info.title.options.style"
        @click.stop="emitSelect({ cmpId, elType: 'title' })"
        @input="updateContent('title', $event)"
        :contenteditable="$store.getters.isEditMode">
        {{ info?.title?.content.text }}
      </h1>
    </section>
    <nav
      v-if="info.nav"
      :style="info?.nav?.options.style"
      @click.stop="emitSelect({ cmpId, elType: 'nav' })">
      <ul>
        <li class="nav" v-for="nav in info?.nav?.content">
          {{ nav }}
        </li>
        <Slide right class="burger">
          <li v-for="nav in info?.nav?.content">
            {{ nav }}
          </li>
        </Slide>
      </ul>
    </nav>
    <button
      class="btn"
      :style="info?.btn?.options.style"
      @click.stop="emitSelect({ cmpId, elType: 'btn' })"
      @change="updateContent('btn')">
      {{ info?.btn?.content.text }}
    </button>
  </header>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'
import { Slide } from 'vue3-burger-menu'
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
    emitSelect(elInfo) {
      eventBus.emit('select', elInfo)
    },
  },
  components: {
    Slide,
  },
}
</script>

<style lang="scss" scoped></style>

<!-- TODO: This way or using separate files with dynamic component -->
