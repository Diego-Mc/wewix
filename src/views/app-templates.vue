<template>
  <!-- <app-header/> -->
  <main class="templates-page">
    <section class="templates">
      <article
        v-for="template in templates"
        class="template"
        :class="{ emptyTemplate: !template.id }"
        @click="openEditor(template.id)"
        @mouseenter="isHover[template.name] = true"
        @mouseleave="isHover[template.name] = false">
        <div>
          <div class="template-details" v-if="isHover[template.name]">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum
              hic non quaerat aliquam quisquam aspernatur explicabo autem ipsum?
              Beatae, sed.
            </p>
            <div class="template-actions">
              <button>Preview</button>
              <button>Edit</button>
            </div>
          </div>

          <div v-else v-if="template.id">
            <img :src="template.img" alt="" class="template-preview-img" />
          </div>
        </div>

        <div class="template-name">
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
        },
        {
          name: 'Bike Shop',
          id: '5e28393890dd7201a06d4e44',
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
.templates {
  grid-gap: 50px;
  display: grid;
  gap: 50px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 300px));
  grid-auto-rows: 350px;
  justify-content: center;
  padding: 0 6%;
  margin-block-start: 100px;

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
}

.template-name {
  align-self: end;
}

.emptyTemplate {
  background-color: white;
}
</style>
