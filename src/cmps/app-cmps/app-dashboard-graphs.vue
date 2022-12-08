<template>
  <!-- <section> -->
  <!-- <section>
      <div v-for="wap in loggedinUserWaps">
        {{ wap }}
      </div>
    </section> -->

  <section class="graph-container">
    <section class="dropdowns">
      <el-dropdown @command="test2">
        <span class="el-dropdown-link">
          Chart Types
          <i class="bi bi-chevron-down"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="chart in chartsOptions"
              :command="chart.value">
              {{ chart.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-dropdown @command="test">
        <span class="el-dropdown-link">
          Data Type
          <i class="bi bi-chevron-down"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="stat in statsOptions"
              :command="stat.value">
              {{ stat.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </section>

    <!-- <select v-model="selectedChart">
      <option v-for="chart in chartsOptions" :value="chart.value">
        {{ chart.label }}
      </option>
    </select>
    <select v-model="selectedStat">
      <option v-for="stat in statsOptions" :value="stat.value">
        {{ stat.label }}
      </option>
    </select> -->
    <section class="graph-wrapper">
      <component
        :is="selectedChart"
        :chartData="chartData"
        responsive
        :options="graphOptions"></component>
    </section>
  </section>
  <!-- </section> -->
</template>

<script>
import { ref } from 'vue'
import {
  DoughnutChart,
  BarChart,
  LineChart,
  PieChart,
  PolarAreaChart,
  RadarChart,
} from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import Chance from 'chance'
Chart.register(...registerables)

export default {
  props: {
    visitorsData: Array,
  },
  data() {
    return {
      loggedinUserWaps: null,
      toys: [],
      selectedChart: 'PieChart',
      selectedStat: 'conversionRate',

      chartsOptions: [
        {
          value: 'DoughnutChart',
          label: 'Doughnut Chart',
        },
        {
          value: 'BarChart',
          label: 'Bar Chart',
        },
        {
          value: 'LineChart',
          label: 'Line Chart',
        },
        {
          value: 'PieChart',
          label: 'Pie Chart',
        },
        {
          value: 'PolarAreaChart',
          label: 'Polar Area Chart',
        },
        {
          value: 'RadarChart',
          label: 'Radar Chart',
        },
      ],

      statsOptions: [
        {
          value: 'frequencyPerHour',
          label: 'Frequency Per Hour',
        },
        {
          value: 'frequencyPerDay',
          label: 'Frequency Per Day',
        },
        {
          value: 'frequencyPerMonth',
          label: 'Frequency Per Month',
        },
        {
          value: 'frequencyPerYear',
          label: 'Frequency Per Year',
        },
        {
          value: 'conversionRate',
          label: 'Conversion Rate',
        },
      ],

      graphOptions: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    }
  },
  created() {
    this.initWaps()
  },

  methods: {
    test(x) {
      console.log('x', x)
      this.selectedStat = x
    },
    test2(x) {
      console.log('x', x)
      this.selectedChart = x
    },
    initWaps() {
      this.loggedinUserWaps = this.$store.getters.loggedinUserWaps
    },
    getWapsiteData() {},
    getDatasetData({ type, dateAfter, columnsFilter }) {
      if (type === 'conversionRate') return [55, 45]
      if (!columnsFilter) return
      else if (type === 'frequencyPer') {
        const users = this.visitorsData
        console.log(
          '🚀 ~ file: app-dashboard-graphs.vue:133 ~ getDatasetData ~ users',
          users
        )

        // Filter By Date Limit
        let filteredUsers = users.filter(
          ({ createdAt }) => createdAt >= dateAfter
        )

        //Map By Selected Date
        filteredUsers = filteredUsers.reduce((usersMap, currUser) => {
          const date = new Date(currUser.createdAt)
          usersMap[date[columnsFilter]()] =
            usersMap[date[columnsFilter]()] + 1 || 1
          return usersMap
        }, {})
        return Object.values(filteredUsers)
      }
    },

    getDemoData() {
      var chance = new Chance()
      const demoData = []
      for (var i = 0; i < 1500; i++) {
        demoData.push({
          firstName: chance.name().split(' ')[0],
          lastName: chance.name().split(' ')[0],
          email: chance.email(),
          createdAt: chance
            .date({ year: chance.integer({ min: 2020, max: 2022 }) })
            [Symbol.toPrimitive]('number'),
          msg: chance.sentence({ words: 5 }),
        })
      }

      return demoData
    },
  },

  computed: {
    chartData() {
      let dateAfter = 0
      let labels = []
      let label = ''
      let columnsFilter

      switch (this.selectedStat) {
        case 'frequencyPerHour':
          label = 'Frequency Per Hour'
          dateAfter = Date.now() - 24 * 60 * 60 * 1000
          labels = [
            ...Array.from(Array(12).keys()).map((num) => num + 1 + 'am'),
            ...Array.from(Array(12).keys()).map((num) => num + 1 + 'pm'),
          ]
          columnsFilter = 'getHours'
          break
        case 'frequencyPerDay':
          label = 'Frequency Per Day'
          dateAfter = Date.now() - 7 * 24 * 60 * 60 * 1000
          labels = Array.from(Array(7).keys()).map((num) => num + 1 + '')
          columnsFilter = 'getDay'
          break
        case 'frequencyPerMonth':
          label = 'Frequency Per Month'
          dateAfter = Date.now() - 30 * 7 * 24 * 60 * 60 * 1000
          labels = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ]
          columnsFilter = 'getMonth'
          break
        case 'frequencyPerYear':
          label = 'Frequency Per Year'
          dateAfter = Date.now() - 12 * 30 * 7 * 24 * 60 * 60 * 1000
          labels = ['2020', '2021', '2022']
          columnsFilter = 'getFullYear'
          break
        case 'conversionRate':
          label = 'Conversion Rate'
          labels = ['No', 'Yes']
          break
      }
      const data =
        this.selectedStat === 'conversionRate'
          ? this.getDatasetData({ type: 'conversionRate' })
          : this.getDatasetData({
              type: 'frequencyPer',
              columns: labels.length,
              columnsFilter,
              dateAfter,
            })

      return {
        labels,
        datasets: [
          {
            label,
            data,
            backgroundColor: [
              '#cfc5ff',
              '#ac9bff',
              '#856cff',
              '#5f3eff',
              '#2e15a6',
              '#ffb9b4',
              '#ff9494',
              '#ff6666',
              '#ff3f3f',
              '#b72b2b',
              '#8f1717',
            ],
          },
        ],
      }
    },
  },

  components: {
    DoughnutChart,
    BarChart,
    LineChart,
    PieChart,
    PolarAreaChart,
    RadarChart,
  },
}
</script>

<style></style>
