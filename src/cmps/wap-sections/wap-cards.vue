<template>
  <!-- $emit('select', { cmpId}) -->
  <draggable 
        class="list-group wap-cards"
        :component-data="{
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }" 
        v-model="cards" 
        v-bind="dragOptions" 
        @start="drag = true" 
        @end="drag = false" 
        item-key="order"
        group="section"
    >
        <template #item="{ element }">
          <div>
            <component
                :is="element.type"
                :key="element.id"
                :options="element.options"
                :info="element.info"
                :cmpId="cmpId"
                :childCmpId="element.id"
                @select="emitSelect"/>
          </div>
        </template>
  </draggable>
</template>

<script>
import wapCard from '../wap-items/wap-card.vue'
import draggable from 'vuedraggable'
export default {
  props: ['info', 'cmpId', 'options', 'cmps'],
  methods: {
    updateContent(name) {
      this.$emit('update', { cmpId, name, content: info.text.content })
    },
  },
  data() {
    return {

      cards: this.cmps,
      dragOptions: {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      },
      drag: false,
    }
  },
  components: {
    wapCard,
    draggable
  },
  methods: {
    emitSelect(data) {
      this.$emit('select', data)
    }
  },
}
</script>

