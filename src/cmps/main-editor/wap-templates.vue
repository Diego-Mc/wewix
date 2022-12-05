<template>
  <draggable
    :sort="false"
    class="list-group section-cmp-previews"
    @start="startDrag"
    :list="cmpsDropdownOptions"
    item-key="id"
    :group="{
      name: 'sections',
      pull: 'clone',
      put: false,
      // revertClone: true,
    }">
    <template #item="{ element }">
      <li
        class="list-group-item"
        :style="{ backgroundColor: element.backgroundColor }">
        <cmp-item :src="element.previewImg" />
      </li>
    </template>
  </draggable>
</template>

<script>
import { wapGraph } from '../../services/wap-new-model'
import draggable from 'vuedraggable'
import cmpItem from './editor-items/cmp-item.vue'
import { utilService } from '../../services/util.service'
import getCmp from '../../services/wap-cmps.service'
import { wapVideo, wapMap, wapForm } from '../../services/wap-new-model'
export default {
  components: {
    draggable,
    cmpItem,
  },
  data() {
    return {
      cmpsDropdownOptions: [
        getCmp('wap-header', 2),
        getCmp('wap-hero', 2),
        getCmp('wap-section', 2),
        getCmp('wap-section', 3),
        getCmp('wap-section', 4),
        getCmp('wap-cards', 2),
        {
  id: 'wc10',
  type: 'wap-map',
  options: {
    meta: {
      mapData: {
        title: '',
        label: '',
        position: {
          lat: '',
          lng: '',
        },
      }
    },
    style: {
      backgroundColor: '',
      fontFamily: '',
      color: '',
      borderRadius: '',
      fontWeight: '',
    },
  },
  info: {
    title: {
      options: {
        meta: {},
        style: {},
      },
      content: {},
    },
  },
},
      ],
    }
  },
  methods: {
    startDrag(e) {
      const { type, typeId } = e.item.__draggable_context.element
      e.item.__draggable_context.element = getCmp(type, typeId)
      // this.cmpsDropdownOptions = [
      //   // 'header',
      //   getCmp('wap-cards', 2),
      //   getCmp('wap-section', 2),
      //   getCmp('wap-section', 3),
      //   // cmpCardImg: 'src/assets/imgs/cmp-cards-2.png',
      //   // cmp:null
      //   // getCmp('wap-section', 4),
      //   // getCmp('wap-form', 1),
      //   // wapVideo,
      //   // wapMap,
      // ]
    },
  },
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
