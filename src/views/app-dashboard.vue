<template>

  <main>
    <header>
      <h2>Dashboard</h2>
      <nav>
        <li>View Site</li>
        <li>Edit Site</li>
      </nav>
    </header>

    <section class="charts-container">
      <select @change="selectedChart">
        <option v-for="chart in chartsOptions" :value="chart.value">{{ chart.label }}</option>
      </select>
      <select v-model="selectedStat">
        <option v-for="stat in statsOptions" :value="stat.value">{{ stat.label }}</option>
      </select>
      <component :is="selectedChart" :chartData="chartsData"></component>
    </section>

    <section>
      <h3>Statistics</h3>
    </section>

    <section>
      <h3>Leads</h3>
    </section>

    <pre>{{chartData}}</pre>
  </main>

</template>

<script>
import { ref } from 'vue'
import { DoughnutChart, BarChart, LineChart, PieChart, PolarAreaChart, RadarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  data() {
    return {
      toys: [],
      selectedChart: '',
      selectedStat: '',

      chartsOptions: [
        {
          value: 'DoughnutChart',
          label: 'Doughnut Chart'
        }, {
          value: 'BarChart',
          label: 'Bar Chart'
        }, {
          value: 'LineChart',
          label: 'Line Chart'
        }, {
          value: 'PieChart',
          label: 'Pie Chart'
        }, {
          value: 'PolarAreaChart',
          label: 'Polar Area Chart'
        }, {
          value: 'RadarChart',
          label: 'Radar Chart'
        },
      ],

      statsOptions: [
        {
          value: 'frequencyPerDay',
          label: 'Frequency Per Day'
        },
        {
          value: 'frequencyPerWeek',
          label: 'Frequency Per Week'
        },
        {
          value: 'frequencyPerMonth',
          label: 'Frequency Per Month'
        },
        {
          value: 'frequencyPerYear',
          label: 'Frequency Per Year'
        },
        {
          value: 'conversionRate',
          label: 'Conversion Rate'
        },
      ],
    }
  },

  methods: {
    getDatasetData(options) {

    }
  },

  computed: {
    chartData() {

      let dateBefore = 0
      let labels = []
      let label = ''

      switch (this.selectedStat) {
        case 'frequencyPerDay':
          label = 'Frequency Per Day'
          dateBefore = Date.now() - (24 * 60 * 60 * 1000)
          labels = ['8Am', '10Am', '12Am', '2Pm', '4Pm', '6Pm', '8Pm']
          break
        case 'frequencyPerWeek':
          label = 'Frequency Per Week'
          dateBefore = Date.now() - (7 * 24 * 60 * 60 * 1000)
          labels = ['su', 'mo', 'tu', 'we', 'th', 'fr']
          break
        case 'frequencyPerMonth':
          label = 'Frequency Per Month'
          dateBefore = Date.now() - (30 * 7 * 24 * 60 * 60 * 1000)
          labels = ['1', '5', '10', '15', '20', '25', '30']
          break
        case 'frequencyPerYear':
          label = 'Frequency Per Year'
          dateBefore = Date.now() - (12 * 30 * 7 * 24 * 60 * 60 * 1000)
          labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
          break
        case 'conversionRate':
          label = 'Conversion Rate'
          labels = ["No", "Yes"]
          break
      }

      // data = (this.selectedStat === 'conversionRate') ? getDatasetData({ type: 'prec' }) : getDatasetData({ type: 'freq', dateBefore, label })

      return {
        labels,
        datasets: [
          {
            label,
            data: 'demo',
            backgroundColor: ['#cfc5ff', '#ac9bff', '#856cff', '#5f3eff', '#2e15a6', '#ffb9b4', '#ff9494', '#ff6666', '#ff3f3f', '#b72b2b', '#8f1717'],
          },
        ],
      }
    }
  },

  components: { DoughnutChart, BarChart, LineChart, PieChart, PolarAreaChart, RadarChart },
}

import Chance from 'chance'

// Instantiate Chance so it can be used
var chance = new Chance();

function getDemoData() {
  const demoData = []
  for (var i = 0; i < 100; i++) {
    demoData.push({
      firstName: chance.name().split(" ")[0],
      lastName: chance.name().split(" ")[0],
      email: chance.email(),
      date: chance.date()[Symbol.toPrimitive]('number'),
      msg: chance.sentence({ words: 5 }),
      siteId: 'asfgasgsdvds1512'
    })
  }
  console.log(demoData);
  return demoData
}



const demoData = getDemoData()

const chartData = {
  labels: [],
  datasets: [
    {
      label: 'Frequency',
      data: [],
      backgroundColor: ['#cfc5ff', '#ac9bff', '#856cff', '#5f3eff', '#2e15a6',],
    },
    {
      label: 'Mean Price',
      backgroundColor: ['#ffb9b4', '#ff9494', '#ff6666', '#ff3f3f', '#b72b2b', '#8f1717'],
      data: []
    },
    {
      label: 'Reviews Count',
      backgroundColor: ['#ecffa9', '#e4ff86', '#bdd85f', '#879f34', '#5e7020', '#52660d'],
      data: []
    },
    {
      label: 'Stock Percentage',
      backgroundColor: ['#cef8ff', '#87bec7', '#5ba0ab', '#429dab', '#1a8c9e', '#0d6472'],
      data: []
    }
  ],
}
</script>

