<template>
      <section>
        <h3>sections to add</h3>
        <draggable class=" list-group" :list="cmpsTest" item-key="order"
          :group="{ name: 'sections', pull: 'clone', put: false }">
          <template #item="{ element }">
            <li class="list-group-item" :style="{ backgroundColor: element.backgroundColor }">
              <p>{{ element.type }}</p>
            </li>
          </template>
        </draggable>
      </section>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    components: {
        draggable,
    },
    data() {
        return {
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
                },
            ],
        }
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