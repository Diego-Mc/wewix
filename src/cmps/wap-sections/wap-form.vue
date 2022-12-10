<template>
  <!--  -->
  <article class="wap-form" :class="'type-' + typeId">
    <h3
      class="title"
      :style="info?.title?.options.style"
      @click.stop="emitSelect({ cmpId, childCmpId, elType: 'title' })"
      @input="updateContent('title', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.title?.content.text }}
    </h3>
    <p
      class="text"
      :style="info?.text?.options.style"
      @click.stop="emitSelect({ cmpId, childCmpId, elType: 'text' })"
      @input="updateContent('text', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.text?.content.text }}
    </p>
    <!-- <p class="text" :style="info.text.options.style">
      Sign up to get the latest Dance offers, updates, and tips straight to your
      inbox.
      {{ info.text.content.text }}
    </p> -->
    <form
      @submit.prevent="formSubmited"
      @click.stop="emitSelect({ cmpId, childCmpId })">
      <div
        v-for="(field, idx) in options?.meta?.formInputs"
        class="input-fields">
        <wap-form-item
          type="email"
          v-model="userInfo[field.tag]"
          :tag="field.tag" />
      </div>
      <!-- <wap-form-item  type="email" v-model="userInfo.email" /> -->
      <!-- <wap-form-item type="msg" v-model="userInfo.msg" /> -->
      <!-- :style="info.btn.options.style" -->
      <button
        @click="userInfo.type = 'subscription'"
        class="btn send-btn type-send">
        Send
        <!-- {{ info.btn.content.text }} -->
      </button>
      <button
        @click="userInfo.type = 'subscription'"
        class="btn send-btn type-subscribe">
        Subscribe
        <!-- {{ info.btn.content.text }} -->
      </button>
    </form>
  </article>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'
import wapFormItem from '../wap-items/wap-form-item.vue'

import { socketService } from '../../services/socket.service.js'

export default {
  props: ['info', 'cmpId', 'options', 'typeId', 'childCmpId'],
  data() {
    return {
      userInfo: {},
    }
  },
  created() {},
  methods: {
    formSubmited() {
      if (this.$store.getters.isEditMode) return
      this.userInfo.createdAt = Date.now()
      eventBus.emit('formSubmited', { ...this.userInfo })
      const wap = this.$store.getters.editedWap
      socketService.emit('formSubmited', {
        ...this.userInfo,
        wapOwnerId: wap.owner._id,
        wapId: wap._id,
        wapName: wap.name,
      })
    },
    updateContent(elType, e) {
      eventBus.emit('cmpUpdated', {
        cmpId: this.cmpId,
        elType,
        content: e.target.innerText,
        childCmpId: this.childCmpId,
        elDom: e,
      })
    },
    emitSelect(elInfo) {
      eventBus.emit('select', { ...elInfo })
      // this.userInfo = {}
    },
  },

  components: {
    wapFormItem,
  },
}
</script>

<style lang="scss" scoped></style>
