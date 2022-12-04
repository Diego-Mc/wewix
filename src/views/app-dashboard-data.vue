<template>
    <div>
        <app-dashboard-graphs :usersData="getDemoData"/>
        <app-dashboard-details :usersData="getDemoData"/>
    </div>
</template>

<script>
import Chance from 'chance';
import appDashboardGraphs from '../cmps/app-cmps/app-dashboard-graphs.vue';
import appDashboardDetails from '../cmps/app-cmps/app-dashboard-details.vue';

export default {
    computed: {
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
        //   if (Math.random() < 0.1) demoData[i].addLike = true
        //   else if (Math.random() < 0.3) demoData[i].isSubscribed = true
        //   else if (Math.random() < 0.5) demoData[i].gender = (Math.random() < 0.5) ? 'male' : 'female'
        //   else if (Math.random() < 0.8) demoData[i][(Math.random() < 0.5) ? 'isJobAssign' : 'isHobbyAssign'] = (Math.random() < 0.5)
        }
        console.log(demoData);
        return demoData
      },
    },
    components: {
    appDashboardGraphs,
    appDashboardDetails
}
}
</script>