<template>
  <article class="wap-form" :class="'type-' + typeId">
    <!-- <h3 class="title" :style="info.title.options.style">
      Stay up to speed
      {{ info.title.content.text }}
    </h3>
    <p class="text" :style="info.text.options.style">
      Sign up to get the latest Dance offers, updates, and tips straight to your
      inbox.
      {{ info.text.content.text }}
    </p> -->
    <form @submit.prevent="formSubmited">
      <wap-form-item type="email" v-model="userInfo.email" />
      <wap-form-item type="msg" v-model="userInfo.msg" />
      <!-- :style="info.btn.options.style" -->
      <button @click="userInfo.type = 'message'" class="btn">
        submit
        <!-- {{ info.btn.content.text }} -->
      </button>
      <button @click="userInfo.type = 'subscription'" class="btn">
        subscribe
        <!-- {{ info.btn.content.text }} -->
      </button>
    </form>
  </article>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'
import wapFormItem from '../wap-items/wap-form-item.vue'
export default {
  props: ['info', 'cmpId', 'options', 'typeId'],
  data() {
    return {
      userInfo: {
        email: '',
        msg: '',
        email: '',
        at: '',
        type: null,
      },
    }
  },
  methods: {
    updateContent(elType) {
      this.$emit('update', { cmpId, elType, content: info.text.content })
    },
    formSubmited() {
      this.userInfo.at = Date.now()
      eventBus.emit('formSubmited', this.userInfo)
    },
  },
  created() {},
  components: {
    wapFormItem,
  },
}
</script>

<style lang="scss" scoped></style>
