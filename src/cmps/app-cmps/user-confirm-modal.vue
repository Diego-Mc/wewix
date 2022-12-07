<template>
  <div class="work-together-modal">
    <h3 v-if="!isDisplayUrl" class="work-together-modal-header">
      {{ confirmData.txt }}
    </h3>
    <h3 v-else class="work-together-modal-header">
      Share this link to work together
    </h3>
    <div v-if="!isDisplayUrl">
      <el-button @click="isDisplayUrl = true">Yes</el-button>
      <el-button @click="$emit('closelModal')">No</el-button>
    </div>
    <div v-else class="share-link-modal">
      <p @click="openWorkSpace">{{ currentUrl }}</p>

      <p>click to copy and go to work together</p>
      <el-button @click="openWorkSpace">Work Together!</el-button>
      <button @click="$emit('closelModal')">Cancel</button>
    </div>
  </div>
  <button class="end-work-together">close asdads together</button>
</template>

<script>
export default {
  props: {
    confirmData: Object,
  },

  data() {
    return {
      isDisplayUrl: false,
    }
  },

  methods: {
    copyToClipboard(text) {
      var input = document.createElement('input')
      input.setAttribute('value', text)
      document.body.appendChild(input)
      input.select()
      var result = document.execCommand('copy')
      document.body.removeChild(input)
      return result
    },

    openWorkSpace() {
      this.$router.replace({ ...this.$route, query: { workTogether: true } })
      this.copyToClipboard(this.currentUrl)
      this.$emit('openWorkSpace')
      this.$emit('closelModal')
      this.$notify({
              title: 'Link copied! work together is on',
              type: 'success',
          });

    },
  },
  computed: {
    currentUrl() {
      return window.location.href + '?workTogether=true'
    },
  },
}
</script>

<style lang="scss">
.work-together-modal {
  position: fixed;
  z-index: 100000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 30px;
  text-align: center;

  p {
    max-width: 300px;
    overflow: hidden;
  }
  .work-together-modal-header {
    margin-bottom: 10px;
  }
}

.end-work-together {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.share-link-modal >*{
    margin-bottom: 10px;
}

</style>
