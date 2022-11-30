<template>
  <main v-if="wap">
    <wap-templates />

    <cmp-editor
      v-if="isOpenCmpEditor"
      :id="selectedCmp._id"
      :editOptions="selectedCmp.options"
      :cmpStyle="selectedCmp.options.style"
      @update="handleUpdate()">
    </cmp-editor>

    <draggable
      class="list-group"
      :component-data="{
        type: 'transition-group',
        name: !drag ? 'flip-list' : null,
      }"
      v-model="wap.cmps"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
      item-key="order"
      group="sections">
      <template #item="{ element }">
        <div>
          <component
            :is="element.type"
            :info="element.info"
            @swap=""></component>
        </div>
      </template>
    </draggable>
    <pre>{{ cmpsTest }}</pre>
  </main>
</template>

<script>
import draggable from 'vuedraggable'

import { utilService } from '../services/util.service'

import cmpEditor from '../cmps/app-cmps/cmp-editor.vue'
import wapTemplates from '../cmps/app-cmps/wap-templates.vue'

import wapHeader from '../cmps/wap-sections/wap-header.vue'
import wapHero from '../cmps/wap-sections/wap-hero.vue'

export default {
  data() {
    return {
      wap: null,
      selectedCmp: {},
      isOpenCmpEditor: true,

      drag: false,
      dragOptions: {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      },

      cmpsTest: [
        {
          id: 'wc02',
          type: 'wap-header',
          options: {
            meta: {},
            style: {
              backgroundColor: '',
              fontFamily: '',
              color: '',
            },
          },
          info: {
            title: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {
                text: 'Dance',
              },
            },
            nav: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {
                nav1: 'Concierge',
                nav2: 'Rides',
                nav3: 'For Business',
              },
            },
            btn: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: { text: 'Start now', link: '#wc03' },
            },
          },
        },
        {
          id: 'wc03',
          type: 'wap-hero',
          options: {
            meta: {},
            style: {
              backgroundColor: '',
              fontFamily: '',
              color: '',
            },
          },
          info: {
            title: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {
                text: 'Your future\nis electric',
              },
            },
            text: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: {
                text: 'Get your own ebike or emoped\nwith our flexible subscription',
              },
            },
            btn: {
              options: {
                meta: {},
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: { text: 'Start now', link: '#wc03' },
            },
          },
        },
      ],
      list1: [
        {
          img: 'asdas',
          name: 'John',
          id: 1,
          backgroundColor: '#5e548e',
          children: [{ name: 'John' }],
        },
        {
          name: 'Joao',
          id: 2,
          backgroundColor: '#370617',
          children: [{ name: 'Joao' }],
        },
        {
          name: 'Jean',
          id: 3,
          backgroundColor: '#6a040f',
          children: [{ name: 'Jean' }],
        },
        {
          name: 'Gerard',
          id: 4,
          backgroundColor: '#9d0208',
          children: [{ name: 'Gerard' }],
        },
      ],

      list: [
        {
          name: 'Juan',
          id: 5,
          backgroundColor: '#e85d04',
          children: [
            { name: '1' },
            { name: '2' },
            { name: '3' },
            { name: '4' },
          ],
        },
        {
          name: 'Edgard',
          id: 6,
          backgroundColor: '#f48c06',
          children: [{ name: 'wa' }, { name: 'ha' }],
        },
        {
          name: 'Johnson',
          id: 7,
          backgroundColor: '#faa307',
          children: [{ name: 'wa' }, { name: 'ha' }],
        },
      ],
    }
  },

  methods: {
    handleUpdate({ cmpId, name, content, style }) {
      const cmp = wap.cmps.find(({ _id }) => _id === cmpId)
      wap.cmps.cmp[name] = content ?? cmp.content
      wap.cmps.cmp[name] = style ?? cmp.style
      this.updateWap(wap)
    },

    async loadWap() {
      if (this.$route.params.id) {
        const wap = await this.$store.dispatch({
          type: 'getWap',
          id: this.$route.params.id,
        })
        this.wap = JSON.parse(JSON.stringify(wap))
      }
    },

    handleDrop() {
      this.updateWap(this.wap)
    },

    updateWap(wap) {
      // const updatedWap = JSON.parse(JSON.stringify(wap))
      this.$store.dispatch({ type: 'updateWap', wap: wap })
    },

    select({ cmpId, name }) {
      const cmp = cmps.find(({ _id }) => id === cmpId)

      this.selectedCmp.style = cmp.style
      this.selectedCmp._id = cmpId
      this.selectedCmp.options = Object.keys(this.selectedCmp.style)

      this.isOpenCmpEditor = true
    },
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
    wap: {
      handler(wap) {
        console.log('wa')
        this.updateWap(wap)
      },
      deep: true,
    },
  },

  components: {
    cmpEditor,
    wapTemplates,
    wapHeader,
    draggable,
    wapHero,
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
