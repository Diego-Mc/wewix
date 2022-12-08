<template>
  <draggable
    :sort="false"
    class="list-group section-cmp-previews"
    @start="startDrag"
    :list="cmpToShow"
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
import {
  wapVideo,
  wapMap,
  wapForm,
  wapChat,
} from '../../services/wap-new-model'
export default {
  props: ['cmpType'],
  components: {
    draggable,
    cmpItem,
  },
  data() {
    return {
      cmpsDropdownOptions: [
        getCmp('wap-header', 6),
        getCmp('wap-hero', 6),
        getCmp('wap-section', 21),
        getCmp('wap-section', 22),
        getCmp('wap-section', 23),
        getCmp('wap-section', 24), //
        getCmp('wap-section', 25), //
        getCmp('wap-cards', 11),
        // getCmp('wap-footer', 4),

        // template 4
        getCmp('wap-header', 5),
        getCmp('wap-hero', 5),
        getCmp('wap-section', 15), //
        getCmp('wap-section', 16),
        getCmp('wap-cards', 8),
        getCmp('wap-section', 17),
        getCmp('wap-section', 19),
        getCmp('wap-cards', 9),
        getCmp('wap-section', 18),
        getCmp('wap-section', 20),
        // getCmp('footer', 3)

        // template 3
        getCmp('wap-header', 4),
        getCmp('wap-hero', 4),
        getCmp('wap-section', 9),
        getCmp('wap-section', 10),
        getCmp('wap-cards', 6),
        getCmp('wap-section', 11), //
        getCmp('wap-section', 12), //
        getCmp('wap-section', 13),
        // getCmp('wap-section', 14),

        // template 2
        getCmp('wap-header', 2),
        getCmp('wap-hero', 2),
        getCmp('wap-cards', 2),
        getCmp('wap-section', 2),
        getCmp('wap-section', 3),
        getCmp('wap-section', 4),
        // getCmp('wap-form', 1),

        // template 1
        getCmp('wap-header', 3),
        getCmp('wap-hero', 3),
        getCmp('wap-cards', 3),
        getCmp('wap-section', 5),
        getCmp('wap-cards', 4),
        getCmp('wap-section', 6),
        getCmp('wap-cards', 5),
        getCmp('wap-section', 7),
        // getCmp('wap-form', 2),

        //old:
        // getCmp('wap-header', 2),
        // getCmp('wap-hero', 2),
        // getCmp('wap-section', 2),
        // getCmp('wap-section', 3),
        // getCmp('wap-section', 4),
        // getCmp('wap-cards', 2),
        // wapVideo,
        // wapMap,
        // wapForm,
        wapChat,
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
      //   // cmpCardImg: './assets/imgs/cmp-cards-2.png',
      //   // cmp:null
      //   // getCmp('wap-section', 4),
      //   // getCmp('wap-form', 1),
      //   // wapVideo,
      //   // wapMap,
      // ]
    },
  },
  computed: {
    cmpToShow() {
      console.log('SDFSFSFFSD!!!')
      switch (this.cmpType) {
        case 'video':
          return [getCmp('wap-section', 15), getCmp('wap-section', 25)]
        case 'testimonials':
          return [
            getCmp('wap-section', 11),
            getCmp('wap-section', 12),
            getCmp('wap-section', 24),
            wapChat,
          ]
        case 'section':
          return [
            getCmp('wap-section', 23),
            getCmp('wap-section', 22),
            getCmp('wap-section', 21),
            getCmp('wap-section', 19),
            getCmp('wap-section', 16),
            getCmp('wap-section', 13),
            getCmp('wap-section', 9),
            getCmp('wap-section', 7),
            getCmp('wap-section', 6),
            getCmp('wap-section', 5),
            getCmp('wap-section', 4),
            getCmp('wap-section', 2),
          ]
        case 'hero':
          return [
            getCmp('wap-hero', 6),
            getCmp('wap-hero', 5),
            getCmp('wap-hero', 4),
            getCmp('wap-hero', 3),
            getCmp('wap-hero', 2),
          ]
        case 'header':
          return [
            getCmp('wap-header', 6),
            getCmp('wap-header', 5),
            getCmp('wap-header', 4),
            getCmp('wap-header', 3),
            getCmp('wap-header', 2),
          ]
        case 'gallery':
          return [
            getCmp('wap-section', 18),
            getCmp('wap-section', 17),
            getCmp('wap-section', 10),
            getCmp('wap-section', 3),
          ]
        case 'contact':
          return [getCmp('wap-section', 20)]
        case 'cards':
          return [
            getCmp('wap-cards', 11),
            getCmp('wap-cards', 9),
            getCmp('wap-cards', 8),
            getCmp('wap-cards', 6),
            getCmp('wap-cards', 5),
            getCmp('wap-cards', 4),
            getCmp('wap-cards', 3),
            getCmp('wap-cards', 2),
          ]
      }
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
  opacity: 0.4;
  background: grey;
  /* max-height: 30px; */
  background-color: #b2f8ee;
  overflow: hidden;
  /* float: right; */
  width: 100%;
}

.ghost img {
  width: 100%;
  object-fit: contain;
}

.ghost i {
  display: none;
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
</style>
