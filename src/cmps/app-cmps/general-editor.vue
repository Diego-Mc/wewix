//TODO: change default theme based on chosen template
<template>
  <div>
    <section class="add-chat-container" @click="emitChatToggled">
      <h6 class="edit-type-label">CHAT</h6>
      <h3 style="display: inline; margin-right: 5px" class="add-chat">
        Add chat?
      </h3>

      <input
        type="checkbox"
        :disabled="!this.$store.getters.loggedinUser"
        :checked="isWapHasChat"
         />
    </section>

    <!-- <ul>
      <li
        v-for="font in fontClasses"
        @click.stop="setClass({ fontClass: font.class })">
        <span>{{ font.sign }}</span>
        <span>{{ font.family }}</span>
      </li>
    </ul>

    <ul>
      <li
        v-for="theme in themeClasses"
        @click.stop="setClass({ themeClass: theme.class })">
        <span>{{ theme.class }}</span>
      </li>
    </ul> -->
    <edit-theme-section @select="handleThemeSelect" />
  </div>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'
import editorBtnGroup from '../main-editor/editor-items/editor-btn-group.vue'
import editThemeSection from '../main-editor/cmp-edit-sections/edit-theme-section.vue'
import { ElMessage } from 'element-plus'

export default {
  data() {
    return {
      classState: {
        fontClass: '',
        themeClass: 'theme-1',
      },
      fontClasses: [
        { sign: 'Aa', family: 'System', class: 'f-system' },
        { sign: 'Ss', family: 'Fancy', class: 'f-fancy' },
        { sign: '00', family: 'Mono', class: 'f-mono' },
        { sign: 'Rr', family: 'Round', class: 'f-round' },
        { sign: 'Ff', family: 'Fun', class: 'f-fun' },
        { sign: 'Pr', family: 'Pro', class: 'f-pro' },
        { sign: 'Cc', family: 'Cool', class: 'f-cool' },
        { sign: 'At', family: 'Old', class: 'f-old' },
      ],

      themeClasses: [
        { color: [], class: 'theme-1' },
        { color: [], class: 'theme-2' },
        { color: [], class: 'theme-3' },
        { color: [], class: 'theme-4' },
        { color: [], class: 'theme-5' },
        { color: [], class: 'theme-6' },
      ],
    }
  },
  created() {},
  methods: {
    handleThemeSelect({ key, val }) {
      eventBus.emit('themeChanged', { themeClass: val })
    },
    setClass(classType) {
      this.classState.fontClass = classType.fontClass
        ? classType.fontClass
        : this.classState.fontClass
      this.classState.themeClass = classType.themeClass
        ? classType.themeClass
        : this.classState.themeClass
      eventBus.emit('themeChanged', this.classState)
      document.body.className = `${this.classState.fontClass} ${this.classState.themeClass}`
    },
    emitChatToggled() {
      if (!this.$store.getters.loggedinUser) {
         ElMessage({
          message: 'You must login to add chat',
          type: 'error',
        })
        return

      }
      // TODO: add condition to return if user is guest
      eventBus.emit('toggleChat')
    },
  },
  computed: {
    isWapHasChat() {
      return this.$store.getters.editedWap?.plugins?.chatData ? true : false
    },
  },
  components: {
    editorBtnGroup,
    editThemeSection,
  },
}
</script>

<style>
.add-chat-container {
  margin-bottom: 32px;
}
</style>
