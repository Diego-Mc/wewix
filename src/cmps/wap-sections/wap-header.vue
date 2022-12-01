<template>
  <!-- <div v-if="type1">
    <h1 @change="doSomething">Header</h1>
  </div>
  <div v-if="type2">
    <h1 @change="doSomething">Header</h1>
  </div> -->
  <header
    class="wap-header"
    :style="options.style"
    @click.stop="$emit('select', { cmpId })">
    <section class="logo">
      <h1
        class="title"
        @blur="updateContent('title', $event)"
        :style="info.title.options.style"
        @click.stop="$emit('select', { cmpId, elType: 'title' })"
        :contenteditable="$store.getters.isEditMode">
        {{ info.title.content.text }}
      </h1>
    </section>
    <nav
      :style="info.nav.options.style"
      @click.stop="$emit('select', { cmpId, elType: 'nav' })">
      <ul>
        <li v-for="nav in info.nav.content">
          {{ nav }}
        </li>
      </ul>
    </nav>
    <button
      class="btn"
      :style="info.btn.options.style"
      @click.stop="$emit('select', { cmpId, elType: 'btn' })"
      @change="updateContent('btn')">
      {{ info.btn.content.text }}
    </button>
  </header>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'
export default {
  props: ['info', 'cmpId', 'options'],
  methods: {
    updateContent(elType, e) {
      eventBus.emit('update', {
        cmpId: this.cmpId,
        elType,
        content: e.target.innerText,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>

<!-- TODO: This way or using separate files with dynamic component -->
