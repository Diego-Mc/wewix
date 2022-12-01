<template>
    <main>
        <section class="templates">
            <article  v-for="template in templates">
                <router-link :to="`/edit/${template.id}`">
                    <h2 class="template">{{template.name}}</h2>
                </router-link>
            </article>
        </section>
    </main>

</template>

<script>
export default {
    computed: {
        templates() {
            return [
                {name: 'Empty Template', id: '', img: ''},
                {name: 'Bike Shop', id: '5e28393890dd7201a06d4e44', img: ''},
                {name: 'Bakery', id: '5e28393890dd7201a06d4e45', img: ''},
                {name: 'Cudemi', id: '5e28393890dd7201a06d4e45', img: ''},
            ]
        }
    }
}

</script>

<style>
.template {
    width: 200px;
    height: 250px;
    background-color: lightpink;
    border-radius: 10px;
    padding: 50px;
}

.templates {
    gap: 20px;
    display: flex;
}
</style>