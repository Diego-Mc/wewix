<template>
  <draggable 
        class="list-group wap-cards"
        :component-data="{
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }" 
        v-model="cards" 
        v-bind="dragOptions" 
        @start="drag = true" 
        @end="handleDrop($event)" 
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
                :cmpId="element.id" />
          </div>
        </template>
    </draggable>

    <!-- <draggable :sort="false" class=" list-group" :list="cards" item-key="order"
      :group="{ name: 'sections', pull: 'clone', put: false }">
      <template #item="{ element }">
        <li class="list-group-item" :style="{ backgroundColor: element.backgroundColor }">
          <div>
            <component
                :is="element.type"
                :key="element.id"
                :options="element.options"
                :info="element.info"
                :cmpId="element.id" />
          </div>
        </li>
      </template>
    </draggable> -->
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
    }
  },
  components: {
    wapCard,
    draggable
  },
  methods: {
    handleDrop(ev) {
      console.log(ev);
      [this.cards[oldIndex], this.cards[newIndex]] = [this.cards[newIndex], this.cards[oldIndex]]
      drag = false
    }
  },
}
</script>

