<template>
    <!-- <app-header/> -->
  <main class="templates-page">
    <h2>Choose a template for your website</h2>
    <section class="templates-container">
        <div class="templates">
      <article v-for="template in templates">
        <router-link :to="`/edit${template.id ? '/' + template.id : ''}`">
          <h2 class="template">{{ template.name }}</h2>
          
        </router-link>
      </article>
    </div>
    </section>
   
  </main>
</template>

<script>
import appHeader from '../cmps/app-cmps/app-header.vue';
export default {
    components:{appHeader,},
    computed: {
        templates() {
            return [
                {name: 'Empty Template', id: '', img: ''},
                {name: 'Bike Shop', id: '5e28393890dd7201a06d4e44', img: ''},
                {name: 'Bakery', id: '5e28393890dd7201a06d4e45', img: ''},
                {name: 'Cudemi', id: '5e28393890dd7201a06d4e45', img: ''},
            ]
        }
    }
}
</script>

<style>
.templates-container{
    display: flex;
    justify-content: center;
    align-items: center;
}
.templates {
    grid-gap: 50px;
    display: grid;
    gap: 50px;
    grid-template-columns: repeat(auto-fill,minmax(200px,300px));
}
.template {
  width: 200px;
  height: 250px;
  background-color: lightpink;
  border-radius: 10px;
  padding: 50px;
}

</style>
