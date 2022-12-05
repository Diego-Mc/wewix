<template>
    <div>
        <button @click="undo">undo</button>
        <button @click="redo">redo</button>
    </div>
</template>

<script>
import { eventBus } from '../../services/event-bus.service';


export default {
    methods: {
        undo() {
            eventBus.emit('undo')
            
        },
        redo() {
            eventBus.emit('redo')
        },


    },


}
</script>