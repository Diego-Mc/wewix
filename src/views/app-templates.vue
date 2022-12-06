<template>
  <app-header />
  <main class="templates-page">
    <h2 class="template-page-header">Choose a template for your website</h2>
    <section class="templates">
      <article
        v-for="template in templates"
        class="template"
        :class="{ emptyTemplate: !template.id }"
        @mouseenter="isHover[template.name] = true"
        @mouseleave="isHover[template.name] = false">
        <div style="height: 100%">
          <div
            class="template-details"
            v-if="isHover[template.name]"
            :style="{ backgroundImage: 'url(template.img)' }">
            <p>
              {{ template.detalis }}
            </p>
            <div class="template-actions">
              <button>Preview</button>
              <button @click="openEditor(template.id)">Edit</button>
            </div>
          </div>

          <div v-else v-if="template.id">
            <img :src="template.img" alt="" class="template-preview-img" />
          </div>
        </div>

        <div class="template-name-container">
          <h2>{{ template.name }}</h2>
          <p v-if="template.type">{{ template.type }}</p>
        </div>
      </article>
    </section>
  </main>
</template>

<script>
import appHeader from '../cmps/app-cmps/app-header.vue'
export default {
  components: { appHeader },
  data() {
    return {
      isHover: {},
    }
  },
  methods: {
    openEditor(templateId) {
      this.$router.push({ path: '/edit/', query: { templateId } })
    },
  },

  computed: {
    templates() {
      return [
        {
          name: 'Start from scratch',
          id: '',
          img: './src/assets/imgs/templates-template.jpg',
          type: '',
          detalis: 'Build a website from scratch.',
        },
        {
          name: 'Bike Shop',
          id: 'template-1',
          img: './src/assets/imgs/template-1-preview-img.png',
        },
        {
          name: 'Bakery',
          id: '5e28393890dd7201a06d4e45',
          img: './src/assets/imgs/templates-template.jpg',
        },
        {
          name: 'Cudemi',
          id: '5e28393890dd7201a06d4e45',
          img: './src/assets/imgs/templates-template.jpg',
        },
      ]
    },
  },
}
</script>

<style lang="scss">
.template-page-header {
  margin-top: 50px;
  text-align: center;
}
.templates {
  grid-gap: 50px;
  display: grid;
  gap: 50px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 250px));
  grid-auto-rows: 350px;
  justify-content: center;
  padding: 0 6%;
  margin-block-start: 50px;

  .template-preview-img {
    border-radius: 8px 8px 0 0px;
  }

  .template {
    box-shadow: 0.5px 0.5px 7px 0.1px #505050;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // -webkit-line-break: ;
  }
  .emptyTemplate {
    background-color: white;
  }
  .emptyTemplate:after {
    content: '+';
    position: absolute;
    width: 10px;
    top: 6;
    left: 50%;
    top: 100%;
    margin-left: -5px;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 50s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.template-details {
  opacity: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  flex-direction: column;
  padding-block: 20px;
}

.template-name-container {
  align-self: center;
  line-height: 60px;
  border-top: 1px solid #e7e7e7;
  width: 100%;
  text-align: center;
}
</style>
