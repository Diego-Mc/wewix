<template>
  <section>
    <h3>sections to add</h3>
    <draggable
      :sort="false"
      class="list-group"
      :list="cmpsDropdownOptions"
      item-key="order"
      :group="{ name: 'sections', pull: 'clone', put: false }">
      <template #item="{ element }">
        <li
          class="list-group-item"
          :style="{ backgroundColor: element.backgroundColor }">
          <p>{{ element.type }}</p>
        </li>
      </template>
    </draggable>
  </section>
</template>

<script>
import draggable from 'vuedraggable'
import getCmp from '../../services/wap-cmps.service'

import { wapVideo, wapMap } from '../../services/wap-new-model'

export default {
  components: {
    draggable,
  },
  data() {
    return {
      cmpsDropdownOptions: [getCmp('wap-header', 1), getCmp('wap-hero', 1), getCmp('wap-section', 1), getCmp('wap-cards', 1), wapVideo, wapMap],
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

.main {
  display: grid;
  grid-template-columns: 200px 1fr;
}

.section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px 0;
}

.section p {
  text-align: center;
}

.cmp {
  padding: 10px;
  border: 1px dotted white;
  border-collapse: separate;
  text-align: center;
}

.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

li {
  list-style: none;
}

.ghost {
  opacity: 0.5;
  background: grey;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}

tr {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

td {
  padding: 5px;
  background-color: lightcoral;
  min-width: 200px;
}
</style>


