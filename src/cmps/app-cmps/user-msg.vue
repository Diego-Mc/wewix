<template>
  <div  v-if="alive" class="alert" :class="alertClass">
    <p>
      {{ msg.txt }}
    </p>
  </div>
</template>


<script>
import { eventBus, SHOW_MSG } from "../../services/event-bus.service"

export default {
  created() {
    console.log(this.msg);
    eventBus.on(SHOW_MSG, (msg) => {
      this.msg = msg
      var delay = msg.delay || 5000
      this.alive = true
      window.scrollTo({top: 0, behavior: 'smooth'});
      setTimeout(() => {
        this.alive = false
      }, delay)
    })
  },
  data() {
    return {
      alive: false,
      msg: null,
    }
  },
  computed: {
    alertClass() {
      if (!this.msg) return
      return `alert-${this.msg.type}`
    },
  },
}
</script>

<style>
.alert{
  background-color: purple;
  color: black;
  position: fixed;
  height: 70px;
  width: 300px;
  top: 100%;
  right: 10%;
  z-index: 1000000;
  transform: translateY(-200%);
}



</style>