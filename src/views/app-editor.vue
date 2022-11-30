<template>
    <main v-if="cmps">

      <section>
        <h3>sections to add</h3>
        <draggable class=" list-group" :list="list1" item-key="order"
          :group="{ name: 'sections', pull: 'clone', put: false }">
          <template #item="{ element }">
            <li class="list-group-item" :style="{ backgroundColor: element.backgroundColor }">
              <p>{{ element.name }}</p>
            </li>
          </template>
        </draggable>
      </section>

      <cmp-editor 
          v-if="isOpenCmpEditor" 
          :id="selectedCmp._id" 
          :editOptions="selectedCmp.options"
          :cmpStyle="selectedCmp.style" 
          @update="handleUpdate()">
      </cmp-editor>
      
      <component v-for="cmp in cmps" is="cmp.type" @update="handleUpdate()" @select="select">
      </component>

    <component v-for="cmp in cmps" is="cmp.type" @update="handleUpdate()" @select="select">
    </component>

    <!-- <component
          v-for="cmp in cmps"
          :is="cmp.type"
          :info="cmp.info"
          :cmpId="cmp._id"
          @update="handleUpdate()"
          @select="select">
      </component> -->

    <draggable class="list-group" :component-data="{
      type: 'transition-group',
      name: !drag ? 'flip-list' : null
    }" v-model="cmps" v-bind="dragOptions" @start="drag = true" @end="drag = false" item-key="order">
      <template #item="{ element }">
        <div>
          <component :is="element.type" :info="element.info"></component>
        </div>
      </template>
        
      </draggable>
              <pre>{{ cmpsTest }}</pre>
    </main>
</template>

<script>
import draggable from 'vuedraggable'

import { utilService } from '../services/util.service'

import cmpEditor from '../cmps/cmp-editor.vue'
import wapHeader from '../cmps/wap-header.vue'
import wapHero from '../cmps/wap-hero.vue'
import appTemplates from './app-templates.vue'

export default {
  data() {
    return {
      cmps: null,
      selectedCmp: {},
      isOpenCmpEditor: true,

      drag: false,
      dragOptions: {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      },

      cmpsTest: [
        {
          id: 'wc02',
          type: 'wap-header',
          style: {
            backgroundColor: '',
          },
          info: {
            title: {
              style: {
                backgroundColor: '',
                fontFamily: '',
                color: '',
              },
              content: {
                text: 'Dance',
              },
            },
            nav: {
              style: {
                fontFamily: '',
                color: '',
                fontWeight: '',
              },
              content: {
                nav1: 'Concierge',
                nav2: 'Rides',
                nav3: 'For Business',
              },
            },
            btn: {
              style: {
                backgroundColor: '',
                fontFamily: '',
                color: '',
                borderRadius: '',
              },
              content: { text: 'Start now', link: '#wc03' },
            },
          },
        },
        {
          id: 'wc03',
          type: 'wap-hero',
          style: {
            backgroundColor: '',
          },
          info: {
            title: {
              style: {
                backgroundColor: '',
                fontFamily: '',
                color: '',
              },
              content: {
                text: 'Your future\nis electric',
              },
            },
            text: {
              style: {
                backgroundColor: '',
                fontFamily: '',
                color: '',
              },
              content: {
                text: 'Get your own ebike or emoped\nwith our flexible subscription',
              },
            },
            btn: {
              style: {
                backgroundColor: '',
                fontFamily: '',
                color: '',
                borderRadius: '',
              },
              content: { text: 'Start now', link: '#wc03' },
            },
          },
        }],
        list1: [
        {
          img: 'asdas',
          name: 'John', id: 1, backgroundColor: '#5e548e',
          children: [
            { name: 'John' },
          ]
        },
        {
          name: 'Joao', id: 2, backgroundColor: '#370617',
          children: [
            { name: 'Joao' },
          ]
        },
        {
          name: 'Jean', id: 3, backgroundColor: '#6a040f',
          children: [
            { name: 'Jean' },
          ]
        },
        {
          name: 'Gerard', id: 4, backgroundColor: '#9d0208',
          children: [
            { name: 'Gerard' },
          ]
        },
      ],

      list: [
        {
          name: 'Juan', id: 5, backgroundColor: '#e85d04',
          children: [
            { name: '1' },
            { name: '2' },
            { name: '3' },
            { name: '4' },
          ]
        },
        {
          name: 'Edgard', id: 6, backgroundColor: '#f48c06',
          children: [
            { name: 'wa' },
            { name: 'ha' }
          ]
        },
        {
          name: 'Johnson', id: 7, backgroundColor: '#faa307',
          children: [
            { name: 'wa' },
            { name: 'ha' }
          ]
        },
      ],

      }
    },
  
  methods: {
    handleUpdate({ cmpId, name, content, style }) {
      const cmp = cmps.find(({ _id }) => _id === cmpId)
      cmp[name] = content ?? cmp.content
      cmp[name] = style ?? cmp.style
    },

    async loadWap() {
      if (this.$route.params.id) {
        const { cmps } = await this.$store.dispatch({ type: 'getWap', id: this.$route.params.id })
        this.cmps = JSON.parse(JSON.stringify(cmps))
      }
    },

    handleDrop() {
      this.$store.dispatch({ type: 'updateCmps', cmps: this.cmps })
    },

    select({ cmpId, name }) {
      const cmp = cmps.find(({ _id }) => id === cmpId)

      this.selectedCmp.style = cmp.style
      this.selectedCmp._id = cmpId
      this.selectedCmp.options = Object.keys(this.selectedCmp.style)

      this.isOpenCmpEditor = true
    }

  },
  // computed: {
  //   cmps() {
  //     return JSON.parse(JSON.stringify(this.$store.getters.editedWap?.cmps || ''))
  //   },
  // },
  created() {
    this.loadWap()
    // this.handleDrop()
  },

  watch: {
    cmps: {
      handler(cmps) {
      },
      deep: true,
    },

  },

  components: {
    cmpEditor,
    appTemplates,
    wapHeader,
    draggable,
    wapHero
  },
}
</script>


<style>
*{
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

