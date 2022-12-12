<template>
  <nav
    v-if="info.nav1"
    :class="'type-' + typeId"
    :style="info?.nav?.options.style"
    @click.stop="emitSelect(undefined, $event)">
    <ul>
      <li
        v-if="info.nav1"
        v-scroll-to="
          info.nav1.options.meta.scrollTo && !$store.isEditMode
            ? '#' + info.nav1.options.meta.scrollTo
            : '#app'
        "
        class="nav"
        :style="info?.nav1?.options.style"
        :contenteditable="$store.getters.isEditMode"
        @click.stop="emitSelect('nav1', $event)"
        @input="updateContent('nav1', $event)">
        {{ info.nav1.content.text }}
      </li>
      <li
        v-if="info.nav2"
        v-scroll-to="
          info.nav2.options.meta.scrollTo && !$store.isEditMode
            ? '#' + info.nav2.options.meta.scrollTo
            : '#app'
        "
        class="nav"
        :style="info?.nav2?.options.style"
        :contenteditable="$store.getters.isEditMode"
        @click.stop="emitSelect('nav2', $event)"
        @input="updateContent('nav2', $event)">
        {{ info.nav2.content.text }}
      </li>
      <li
        v-if="info.nav3"
        v-scroll-to="
          info.nav3.options.meta.scrollTo && !$store.isEditMode
            ? '#' + info.nav3.options.meta.scrollTo
            : '#app'
        "
        class="nav"
        :style="info?.nav3?.options.style"
        :contenteditable="$store.getters.isEditMode"
        @click.stop="emitSelect('nav3', $event)"
        @input="updateContent('nav3', $event)">
        {{ info.nav3.content.text }}
      </li>
      <li
        v-if="info.nav4"
        v-scroll-to="
          info.nav4.options.meta.scrollTo && !$store.isEditMode
            ? '#' + info.nav4.options.meta.scrollTo
            : '#app'
        "
        class="nav"
        :style="info?.nav4?.options.style"
        :contenteditable="$store.getters.isEditMode"
        @click.stop="emitSelect('nav4', $event)"
        @input="updateContent('nav4', $event)">
        {{ info.nav4.content.text }}
      </li>
      <li
        v-if="info.nav5"
        v-scroll-to="
          info.nav5.options.meta.scrollTo && !$store.isEditMode
            ? '#' + info.nav5.options.meta.scrollTo
            : '#app'
        "
        class="nav"
        :style="info?.nav5?.options.style"
        :contenteditable="$store.getters.isEditMode"
        @click.stop="emitSelect('nav5', $event)"
        @input="updateContent('nav5', $event)">
        {{ info.nav5.content.text }}
      </li>
      <li
        v-if="info.nav6"
        v-scroll-to="
          info.nav6.options.meta.scrollTo && !$store.isEditMode
            ? '#' + info.nav6.options.meta.scrollTo
            : '#app'
        "
        class="nav"
        :style="info?.nav6?.options.style"
        :contenteditable="$store.getters.isEditMode"
        @click.stop="emitSelect('nav6', $event)"
        @input="updateContent('nav6', $event)">
        {{ info.nav6.content.text }}
      </li>
      <!-- <li
        class="nav"
        v-for="nav in info?.nav?.content"
        @input="updateContent('nav', $event)"
        :contenteditable="$store.getters.isEditMode">
        {{ nav }}
      </li> -->
    </ul>
  </nav>
  <Slide v-if="info.nav" noOverlay right class="burger">
    <li v-for="nav in info?.nav?.content">
      {{ nav }}
    </li>
  </Slide>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'
import { Slide } from 'vue3-burger-menu'

export default {
  props: ['info', 'cmpId', 'options', 'childCmpId', 'typeId'],
  methods: {
    updateContent(elType, e) {
      eventBus.emit('cmpUpdated', {
        cmpId: this.cmpId,
        elType,
        content: e.target.innerText,
        childCmpId: this.childCmpId,
        elDom: e,
      })
    },
    emitSelect(elType, e) {
      console.log(this.cmpId, this.childCmpId, elType)
      eventBus.emit('select', {
        cmpId: this.cmpId,
        childCmpId: this.childCmpId,
        elType,
        elDom: e,
      })
    },
  },
  components: {
    Slide,
  },
}
</script>

<style lang="scss" scoped></style>
