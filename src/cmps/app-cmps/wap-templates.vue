<template>
  <section>
    <h3>sections to add</h3>
    <draggable :sort="false" class=" list-group" :list="cmpsTest" item-key="order"
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
          options: {
            backgroundColor: '',
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
              content: { text: 'Start now' },
            },
          },
        },
        {
          id: 'wc03',
          type: 'wap-hero',
          options: {
            backgroundColor: '',
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
                meta: {
                  href: '#',
                },
                style: {
                  backgroundColor: '',
                  fontFamily: '',
                  color: '',
                },
              },
              content: { text: 'Start now' },
            },
          },
        },
        {
          id: 'wc03',
          type: 'wap-section',
          options: {
            backgroundColor: '',
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
                text: 'Move your way',
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
                text: 'Choose the electric ride that suid tour lifeoptions',
              },
            },
          },
        },
        {
          id: 'wc04',
          type: 'wap-cards',
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
                text: 'Move your way',
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
                text: 'Choose the electric ride that suid tour lifeoptions',
              },
            },
            cmps: [
              {
                id: 'wc02',
                type: 'wap-card',
                options: {
                  meta: {},
                  style: {
                    backgroundColor: '',
                    fontFamily: '',
                    color: '',
                  },
                },
                info: {
                  details: {
                    options: {
                      meta: {},
                      style: {
                        backgroundColor: '',
                        fontFamily: '',
                        color: '',
                      },
                    },
                    content: {
                      text: 'From $39/mo',
                    },
                  },
                  tag: {
                    options: {
                      meta: {},
                      style: {
                        backgroundColor: '',
                        fontFamily: '',
                        color: '',
                      },
                    },
                    content: {
                      text: 'Automn offer',
                    },
                  },
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
                      text: 'Dance One Step',
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
                      text: 'Ebike',
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
                    content: { text: 'See details', link: '#wc03' },
                  },
                },
              },
            ],
          },
        },
      ],
    }
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