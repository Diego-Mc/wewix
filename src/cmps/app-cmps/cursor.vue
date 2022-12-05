<template>
    <div class="work-together-mouse" v-for="cursor in cursorsData" :key="cursor"
        :style="{ top: (cursor.clientXY.clientY + 'px'), left: (cursor.clientXY.clientX + 'px') }">

        <svg v-if="cursor.type === 'down'" xmlns="http://www.w3.org/2000/svg" height="48" width="48">
            <path
                d="M23.25 2q4.55 0 7.775 3.175Q34.25 8.35 34.25 12.9q0 2.6-1.125 4.9Q32 20.1 29.95 21.7h-1.7v-2.5q1.45-1.15 2.225-2.8.775-1.65.775-3.5 0-3.3-2.35-5.6T23.25 5q-3.3 0-5.65 2.3-2.35 2.3-2.35 5.6 0 1.85.775 3.5t2.225 2.8v3.6q-2.8-1.45-4.4-4.1-1.6-2.65-1.6-5.8 0-4.55 3.225-7.725T23.25 2Zm-1.9 42q-.85 0-1.6-.325-.75-.325-1.3-.875L8.15 32.5l2.8-2.9q.7-.7 1.575-1.075t1.825-.125l3.9.9V13q0-2.1 1.45-3.55Q21.15 8 23.25 8q2.1 0 3.55 1.45 1.45 1.45 1.45 3.55v8.6h1.3q.25 0 .45.1t.45.2l7.4 3.6q1.2.55 1.775 1.775.575 1.225.325 2.525l-1.8 10.9q-.25 1.45-1.4 2.375t-2.6.925Zm-.4-3H35l2.15-12.45L28 24h-2.75V13q0-.9-.55-1.45-.55-.55-1.45-.55-.9 0-1.45.55-.55.55-.55 1.45v19.95l-7.7-1.65-1.15 1.15ZM35 41H20.95 35Z"
                :stroke="cursor.color" :fill="cursor.color"
            />
        </svg>

        <svg v-if="cursor.type === 'drag'" xmlns="http://www.w3.org/2000/svg" height="48" width="48">
            <path
                d="M2.25 43.75v-2.5H7.1q-3-3.65-4.925-8.025Q.25 28.85.25 24t1.85-9.225Q3.95 10.4 6.95 6.75h-4.7v-2.5h9.5v9.5h-2.5v-5.7q-3 3.55-4.75 7.45-1.75 3.9-1.75 8.5t1.75 8.475q1.75 3.875 4.75 7.475v-5.7h2.5v9.5Zm27.45-.05-13.6-5.25 1.4-3.8q.35-.9 1-1.575.65-.675 1.6-.875l3.95-.8-6.65-14.85q-.85-1.9-.1-3.825.75-1.925 2.65-2.775 1.9-.85 3.825-.125 1.925.725 2.775 2.625l3.5 7.85 1.2-.5q.2-.1.45-.1h.5l8.2.3q1.3.05 2.3.9 1 .85 1.35 2.15l2.8 10.7q.4 1.45-.275 2.75t-2.025 1.9l-11.7 5.2q-.75.35-1.575.375Q30.45 44 29.7 43.7Zm1.55-2.7 12.85-5.7L41 23.05l-10.2-.45-2.5 1.15-4.5-10.05q-.4-.85-1.1-1.15-.7-.3-1.55.1-.85.4-1.125 1.1-.275.7.125 1.55l8.1 18.25-7.7 1.6L20 36.7Zm0 0Z"
                :stroke="cursor.color" :fill="cursor.color"
            />
        </svg>

        <svg v-if="cursor.type === 'move'" xmlns="http://www.w3.org/2000/svg" height="48" width="48">
            <path 
                d="M21.25 42q-.85 0-1.6-.325-.75-.325-1.3-.875L8.05 30.5l2.8-2.9q.7-.7 1.575-1.075t1.825-.125l3.9.9V11q0-2.1 1.45-3.55Q21.05 6 23.15 6q2.1 0 3.55 1.45Q28.15 8.9 28.15 11v8.6h1.3q.25 0 .45.1t.45.2l7.4 3.6q1.2.55 1.775 1.775.575 1.225.325 2.525l-1.8 10.9q-.25 1.45-1.4 2.375t-2.6.925Zm-.4-3H34.9l2.15-12.45L27.9 22h-2.75V11q0-.9-.55-1.45Q24.05 9 23.15 9q-.9 0-1.45.55-.55.55-.55 1.45v19.95l-7.7-1.65-1.15 1.15Zm0 0H34.9Z"
                :stroke="cursor.color" :fill="cursor.color"
            />
        </svg>


    </div>
</template>

<script>
import { utilService } from '../../services/util.service';
export default {
    props: {
        cursorsData: Array
    },
    methods: {
    },
    computed: {
        cursorColor() {
            return utilService.getRandomColor()
        },
        cursorX() {
            return this.cursorsData[0].clientXY.clientX + 'px'
        }

    },

}
</script>

<style>
.work-together-mouse {
    position: absolute;
    z-index: 100000;
}
</style>