<template>
  <article class="cmp-img-container">
    <img :src="src" />
    <i class="grab-icon bi bi-grip-vertical"></i>
  </article>
</template>

<script>
export default {
  props: ['src'],
}
</script>

<style lang="scss" scoped></style>
