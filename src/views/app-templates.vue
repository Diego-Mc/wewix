<template>
  <!-- <app-header/> -->
  <main class="templates-page">

    <section class="templates">
      <article 
          v-for="template in templates"
          class="template"
          @mouseenter="isHover[template.name] = true" 
          @mouseleave="isHover[template.name] = false"
      >
        <div class="template-details" v-if="isHover[template.name]">
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum hic non quaerat aliquam quisquam
            aspernatur explicabo autem ipsum? Beatae, sed.
          </p>
          <div class="template-actions">
            <button>Preview</button>
            <button>Edit</button>
          </div>
        </div>

        <div v-else>
            <img :src="template.img" alt="">
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
import appHeader from '../cmps/app-cmps/app-header.vue';
export default {
  components: { appHeader, },
  data() {
    return {
      isHover: {

      }
    }
  },
  computed: {
    templates() {
      return [
        { name: 'Empty Template', id: '', img: './src/assets/imgs/templates-template.jpg', type: '' },
        { name: 'Bike Shop', id: '5e28393890dd7201a06d4e44', img: './src/assets/imgs/templates-template.jpg' },
        { name: 'Bakery', id: '5e28393890dd7201a06d4e45', img: './src/assets/imgs/templates-template.jpg' },
        { name: 'Cudemi', id: '5e28393890dd7201a06d4e45', img: './src/assets/imgs/templates-template.jpg' },
      ]
    }
  }
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

  .template {
    box-shadow: 0.5px 0.5px 7px 0.1px #505050;
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


</style>
