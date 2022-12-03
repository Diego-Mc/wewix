<template>
  <!-- <section
    class="wap-hero"
    @click.stop="emitSelect({ cmpId })"
    :style="options.style">
    <video
      src="https://knowledge.s.dance.app/videos/hero_home_alt_15s_16_9.webm,"
      autoplay
      loop
      playsinline
      muted></video>
    <h2
      class="title"
      @input="updateContent('title', $event)"
      :style="info.title?.options.style"
      @click.stop="emitSelect({ cmpId, elType: 'title' })"
      :contenteditable="$store.getters.isEditMode">
      {{ info.title?.content.text }}
    </h2>
    <p
      class="text"
      @input="updateContent('text', $event)"
      :style="info.text?.options.style"
      @click.stop="emitSelect({ cmpId, elType: 'text' })"
      :contenteditable="$store.getters.isEditMode">
      {{ info.text?.content.text }}
    </p>
    <button
      class="btn"
      :style="info.btn?.options.style"
      @click.stop="emitSelect({ cmpId, elType: 'btn' })">
      <span
        :contenteditable="$store.getters.isEditMode"
        @input="updateContent('btn', $event)">
        {{ info.btn?.content.text }}
      </span>
    </button>
  </section> -->
  <draggable
    class="list-group wap-hero"
    :class="'type-' + typeId"
    @click.stop="onCmpClick({cmpId})"
    :style="options.style"
    :component-data="{
      type: 'transition-group',
      name: !drag ? 'flip-list' : null,
    }"
    v-model="cmps"
    v-bind="dragOptions"
    @start="drag = true"
    @end="onDrop"
    item-key="order"
    :group="'hero-' + cmpId">
    <template #item="{ element }">
      <div>
        <component
          :is="element.type"
          :key="element.id"
          :options="element.options"
          :info="element.info"
          :cmpId="cmpId"
          :childCmpId="element.id"
          :typeId="element.typeId"
          @click.stop="onCmpClick({ cmpId, childCmpId: element.id })" />
        <!-- <video
            src="https://knowledge.s.dance.app/videos/hero_home_alt_15s_16_9.webm,"
            autoplay
            loop
            playsinline
            muted></video>

          <span
            class="tag"
            :style="info?.tag?.options.style"
            @click.stop="$emit('select', { cmpId, elType: 'tag' })"
            @change="updateContent('tag')"
            :contenteditable="$store.getters.isEditMode">
            {{ info?.tag?.content.text }}This is tag
          </span>

          <h2
            class="title"
            @input="updateContent('title',$event)"
            :style="info?.title?.options.style"
            @click.stop="eventBus.emit('select', { cmpId, elType: 'title' })"
            :contenteditable="$store.getters.isEditMode">
            {{ info?.title?.content.text }}
          </h2>

          <p
            class="text"
            @input="updateContent('text',$event)"
            :style="info?.text?.options.style"
            @click.stop="eventBus.emit('select', { cmpId, elType: 'text' })"
            :contenteditable="$store.getters.isEditMode">
            {{ info?.text?.content.text }}
          </p>

          <button
            class="btn"
            :style="info?.btn?.options.style"
            @click.stop="eventBus.emit('select', { cmpId, elType: 'btn' })">
            <span
              :contenteditable="$store.getters.isEditMode"
              @input="updateContent('btn',$event)">
              {{ info?.btn?.content.text }}
            </span>
          </button> -->
      </div>
    </template>
  </draggable>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'
import wapImgSection from '../wap-items/wap-img-section.vue'
import wapTextSection from '../wap-items/wap-text-section.vue'
import draggable from 'vuedraggable'

export default {
  props: ['info', 'cmpId', 'options', 'cmps', 'typeId'],
  methods: {
    onCmpClick(cmpInfo) {
      eventBus.emit('select', cmpInfo)
    },
    onDrop() {
      this.drag = false
      eventBus.emit('onInnerCmpDrop', {
        cmpId: this.cmpId,
        cmps: [...this.cmps],
      })
    },
    updateContent(elType, e) {
      eventBus.emit('cmpUpdated', {
        cmpId: this.cmpId,
        elType,
        content: e.target.innerText,
      })
    },
    emitSelect(elInfo) {
      console.log(elInfo);
      eventBus.emit('select', elInfo)
    },
  },
  data() {
    return {
      dragOptions: {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      },
      drag: false,
    }
  },
  created() {},
  components: {
    wapImgSection,
    wapTextSection,
    draggable,
  },
}
</script>

<style lang="scss" scoped></style>
